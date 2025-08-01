import {
  Address,
  airdropFactory,
  appendTransactionMessageInstructions,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  generateKeyPairSigner,
  lamports,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from "@solana/kit";

import test from "ava";
import {
  DigitalAssetWithToken,
  fetchDigitalAssetWithAssociatedToken,
  getCreateV1InstructionAsync,
  getMintV1InstructionAsync,
  getTransferV1InstructionAsync,
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

test("it can transfer a NonFungible", async (t) => {
  const rpc = createSolanaRpc("http://localhost:8899");
  const rpcSubscriptions = createSolanaRpcSubscriptions("ws://localhost:8900");
  const airdrop = airdropFactory({ rpc, rpcSubscriptions });
  const confirmTransaction = sendAndConfirmTransactionFactory({
    rpc,
    rpcSubscriptions,
  });

  const ownerA = await generateKeyPairSigner();
  await airdrop({
    recipientAddress: ownerA.address,
    lamports: lamports(1_000_000_000n), // 1 SOL
    commitment: "confirmed",
  });

  // createDigitalAssetWithToken
  const mint = await generateKeyPairSigner();
  const { value: blockhashResponse } = await rpc.getLatestBlockhash().send();

  const [createInstruction, mintInstruction] = await Promise.all([
    getCreateV1InstructionAsync({
      mint,
      name: "My NFT",
      uri: "https://example.com",
      sellerFeeBasisPoints: 25, // 2.5%
      //   tokenOwner: ownerA.address, // very confusing, included in the metaplex createDigitalAssetWithToken but not in the createV1 instruction
      // missing (in type): metadata, authority, payer
      authority: ownerA,
      // payer: ownerA,
    }),
    getMintV1InstructionAsync({
      authority: ownerA,
      mint: mint.address,
      amount: 1,
      tokenStandard: TokenStandard.NonFungible,
      authorizationData: null, // TODO: why is this not optional?
    }),
  ]);

  console.log("mintInstruction", JSON.stringify(mintInstruction, null, 2));

  const transaction = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(ownerA, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(blockhashResponse, tx),
    (tx) =>
      appendTransactionMessageInstructions(
        [createInstruction, mintInstruction],
        tx
      )
  );

  const signedTransaction = await signTransactionMessageWithSigners(
    transaction
  );
  await confirmTransaction(signedTransaction, { commitment: "confirmed" });

  // When we transfer the asset to owner B
  const ownerB = await generateKeyPairSigner();

  const transferInstruction = await getTransferV1InstructionAsync({
    mint: mint.address,
    authority: ownerA,
    tokenOwner: ownerA.address,
    destinationOwner: ownerB.address,
    tokenStandard: TokenStandard.NonFungible,
    authorizationData: null, // TODO: why is this not optional?});
  });

  const transferTransaction = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(ownerA, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(blockhashResponse, tx),
    (tx) => appendTransactionMessageInstructions([transferInstruction], tx)
  );

  const signedTransferTransaction = await signTransactionMessageWithSigners(
    transferTransaction
  );

  await confirmTransaction(signedTransferTransaction, {
    commitment: "confirmed",
  });

  const da = await fetchDigitalAssetWithAssociatedToken(
    rpc,
    mint.address,
    ownerB.address
  );

  console.log("Digital Asset with Token:", JSON.stringify(da, null, 2));

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

  /*
  const { publicKey: mint } = await createDigitalAssetWithToken(umi, {
    tokenOwner: ownerA.publicKey,
  });

  // When we transfer the asset to owner B.
  const ownerB = generateSigner(umi).publicKey;
  await transferV1(umi, {
    mint,
    authority: ownerA,
    tokenOwner: ownerA.publicKey,
    destinationOwner: ownerB,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  // Then the asset is now owned by owner B.
  const da = await fetchDigitalAssetWithAssociatedToken(umi, mint, ownerB);
  t.like(da, <DigitalAssetWithToken>{
    mint: {
      publicKey: publicKey(mint),
      supply: 1n,
    },
    token: {
      publicKey: findAssociatedTokenPda(umi, {
        mint,
        owner: ownerB,
      })[0],
      owner: ownerB,
      amount: 1n,
    },
  });
  */
});
