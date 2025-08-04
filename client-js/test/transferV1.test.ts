import {
  airdropFactory,
  appendTransactionMessageInstructions,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  generateKeyPairSigner,
  Instruction,
  KeyPairSigner,
  lamports,
  pipe,
  Rpc,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
  SolanaRpcApi,
  TransactionMessage,
  TransactionMessageWithBlockhashLifetime,
  TransactionMessageWithFeePayerSigner,
} from "@solana/kit";

import test from "ava";
import {
  DigitalAssetWithToken,
  fetchDigitalAssetWithAssociatedToken,
  getCreateV1InstructionAsync,
  getMintV1InstructionAsync,
  getTransferV1InstructionAsync,
  isMplTokenMetadataError,
  MPL_TOKEN_METADATA_ERROR__INVALID_AMOUNT,
  TokenStandard,
} from "../src";
import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";

// @ts-expect-error Adding toJSON to prototype
BigInt.prototype.toJSON = function () {
  return this.toString();
};

type TestContext = {
  rpc: Rpc<SolanaRpcApi>;
  confirmTransaction: ReturnType<typeof sendAndConfirmTransactionFactory>;
  airdrop: ReturnType<typeof airdropFactory>;
};

function createLocalhostTestContext(): TestContext {
  const rpc = createSolanaRpc("http://localhost:8899");
  const rpcSubscriptions = createSolanaRpcSubscriptions("ws://localhost:8900");
  const confirmTransaction = sendAndConfirmTransactionFactory({
    rpc,
    rpcSubscriptions,
  });
  const airdrop = airdropFactory({ rpc, rpcSubscriptions });
  return { rpc, confirmTransaction, airdrop };
}

async function createSignerWithSol(
  airdrop: TestContext["airdrop"]
): Promise<KeyPairSigner> {
  const signer = await generateKeyPairSigner();
  await airdrop({
    recipientAddress: signer.address,
    lamports: lamports(1_000_000_000n), // 1 SOL
    commitment: "confirmed",
  });
  return signer;
}

type SignedTransaction = Parameters<TestContext["confirmTransaction"]>[0];
type SendableTransactionMessage = TransactionMessage &
  TransactionMessageWithBlockhashLifetime &
  TransactionMessageWithFeePayerSigner;

async function createTransaction(
  { rpc }: Pick<TestContext, "rpc">,
  payer: KeyPairSigner,
  instructions: Instruction[]
): Promise<SendableTransactionMessage> {
  const { value: blockhash } = await rpc.getLatestBlockhash().send();

  const transaction = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(payer, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(blockhash, tx),
    (tx) => appendTransactionMessageInstructions(instructions, tx)
  );

  return transaction;
}

async function sendTransaction(
  { confirmTransaction }: Pick<TestContext, "confirmTransaction">,
  transaction: SendableTransactionMessage
) {
  const signedTransaction = await signTransactionMessageWithSigners(
    transaction
  );

  return await confirmTransaction(signedTransaction, {
    commitment: "confirmed",
    skipPreflight: true, // Skip preflight to make testing program errors easier
  });
}

async function createAndSendTransaction(
  { rpc, confirmTransaction }: Pick<TestContext, "rpc" | "confirmTransaction">,
  payer: KeyPairSigner,
  instructions: Instruction[]
) {
  const transaction = await createTransaction({ rpc }, payer, instructions);
  return await sendTransaction({ confirmTransaction }, transaction);
}

async function createDigitalAssetWithToken(
  { rpc, confirmTransaction }: Pick<TestContext, "rpc" | "confirmTransaction">,
  owner: KeyPairSigner,
  tokenStandard: TokenStandard,
  amount?: number
): Promise<KeyPairSigner> {
  const mint = await generateKeyPairSigner();

  const [createInstruction, mintInstruction] = await Promise.all([
    getCreateV1InstructionAsync({
      mint,
      name: "My NFT",
      uri: "https://example.com",
      sellerFeeBasisPoints: 25, // 2.5%
      authority: owner,
      tokenStandard,
    }),
    getMintV1InstructionAsync({
      authority: owner,
      mint: mint.address,
      amount: amount ?? 1,
      tokenStandard,
    }),
  ]);

  await createAndSendTransaction({ rpc, confirmTransaction }, owner, [
    createInstruction,
    mintInstruction,
  ]);

  return mint;
}

type TokenStandardKeys = keyof typeof TokenStandard;

const NON_EDITION_NON_FUNGIBLE_STANDARDS: TokenStandardKeys[] = [
  "NonFungible",
  "ProgrammableNonFungible",
];

export const FUNGIBLE_TOKEN_STANDARDS: TokenStandardKeys[] = [
  "FungibleAsset",
  "Fungible",
];

test("it can transfer a NonFungible", async (t) => {
  // Given a NonFungible that belongs to owner A.
  const { rpc, airdrop, confirmTransaction } = createLocalhostTestContext();
  const ownerA = await createSignerWithSol(airdrop);
  const mint = await createDigitalAssetWithToken(
    { rpc, confirmTransaction },
    ownerA,
    TokenStandard.NonFungible
  );

  // When we transfer the asset to owner B
  const ownerB = await generateKeyPairSigner();
  const transferInstruction = await getTransferV1InstructionAsync({
    mint: mint.address,
    authority: ownerA,
    tokenOwner: ownerA.address,
    destinationOwner: ownerB.address,
    tokenStandard: TokenStandard.NonFungible,
  });

  await createAndSendTransaction({ rpc, confirmTransaction }, ownerA, [
    transferInstruction,
  ]);

  // Then the asset is now owned by owner B.
  const da = await fetchDigitalAssetWithAssociatedToken(
    rpc,
    mint.address,
    ownerB.address
  );

  const [expectedTokenAddress] = await findAssociatedTokenPda({
    mint: mint.address,
    owner: ownerB.address,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });

  t.like(da, <DigitalAssetWithToken>{
    mint: {
      address: mint.address,
      supply: 1n,
    },
    token: {
      address: expectedTokenAddress,
      owner: ownerB.address,
      amount: 1n,
    },
  });
});

test("it can transfer a ProgrammableNonFungible", async (t) => {
  // Given a ProgrammableNonFungible that belongs to owner A.
  const { rpc, airdrop, confirmTransaction } = createLocalhostTestContext();
  const ownerA = await createSignerWithSol(airdrop);
  const mint = await createDigitalAssetWithToken(
    { rpc, confirmTransaction },
    ownerA,
    TokenStandard.ProgrammableNonFungible
  );

  // When we transfer the asset to owner B.
  const ownerB = await generateKeyPairSigner();
  const transferInstruction = await getTransferV1InstructionAsync({
    mint: mint.address,
    authority: ownerA,
    tokenOwner: ownerA.address,
    destinationOwner: ownerB.address,
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  });

  await createAndSendTransaction({ rpc, confirmTransaction }, ownerA, [
    transferInstruction,
  ]);

  // Then the asset is now owned by owner B.
  const da = await fetchDigitalAssetWithAssociatedToken(
    rpc,
    mint.address,
    ownerB.address
  );

  const [expectedTokenAddress] = await findAssociatedTokenPda({
    mint: mint.address,
    owner: ownerB.address,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });

  t.like(da, <DigitalAssetWithToken>{
    mint: {
      address: mint.address,
      supply: 1n,
    },
    token: {
      address: expectedTokenAddress,
      owner: ownerB.address,
      amount: 1n,
    },
  });
});

NON_EDITION_NON_FUNGIBLE_STANDARDS.forEach((tokenStandard) => {
  test(`it cannot transfer a ${tokenStandard} with an amount of 0`, async (t) => {
    // Given a NonFungible that is owned by owner A.
    const { rpc, airdrop, confirmTransaction } = createLocalhostTestContext();
    const ownerA = await createSignerWithSol(airdrop);
    const mint = await createDigitalAssetWithToken(
      { rpc, confirmTransaction },
      ownerA,
      TokenStandard[tokenStandard]
    );

    // When we try to transfer an amount of 0.
    const ownerB = await generateKeyPairSigner();
    const transferInstruction = await getTransferV1InstructionAsync({
      mint: mint.address,
      authority: ownerA,
      tokenOwner: ownerA.address,
      destinationOwner: ownerB.address,
      tokenStandard: TokenStandard[tokenStandard],
      authorizationData: null, // TODO: why is this not optional?});
      amount: 0,
    });

    const transferTransaction = await createTransaction({ rpc }, ownerA, [
      transferInstruction,
    ]);

    const promise = sendTransaction(
      { confirmTransaction },
      transferTransaction
    );

    // Then we expect a program error.
    const error = await t.throwsAsync(promise);
    t.true(
      isMplTokenMetadataError(
        error,
        transferTransaction,
        MPL_TOKEN_METADATA_ERROR__INVALID_AMOUNT
      )
    );
  });
});

FUNGIBLE_TOKEN_STANDARDS.forEach((tokenStandard) => {
  test(`it can transfer a ${tokenStandard}`, async (t) => {
    // Given a fungible such that owner A owns 42 tokens.
    const { rpc, airdrop, confirmTransaction } = createLocalhostTestContext();
    const ownerA = await createSignerWithSol(airdrop);
    const mint = await createDigitalAssetWithToken(
      { rpc, confirmTransaction },
      ownerA,
      TokenStandard[tokenStandard],
      42
    );

    // When we transfer 10 tokens to owner B.
    const ownerB = await generateKeyPairSigner();
    const transferInstruction = await getTransferV1InstructionAsync({
      mint: mint.address,
      authority: ownerA,
      tokenOwner: ownerA.address,
      destinationOwner: ownerB.address,
      tokenStandard: TokenStandard[tokenStandard],
      authorizationData: null, // TODO: why is this not optional?});
      amount: 10,
    });

    await createAndSendTransaction({ rpc, confirmTransaction }, ownerA, [
      transferInstruction,
    ]);

    // Then owner A has 32 tokens
    const assetA = await fetchDigitalAssetWithAssociatedToken(
      rpc,
      mint.address,
      ownerA.address
    );
    t.like(assetA, <DigitalAssetWithToken>{
      mint: { address: mint.address, supply: 42n },
      token: { owner: ownerA.address, amount: 32n },
    });

    // And owner B has 10 tokens.
    const assetB = await fetchDigitalAssetWithAssociatedToken(
      rpc,
      mint.address,
      ownerB.address
    );
    t.like(assetB, <DigitalAssetWithToken>{
      mint: { address: mint.address, supply: 42n },
      token: { owner: ownerB.address, amount: 10n },
    });
  });
});
