import {
  findAssociatedTokenPda,
  getTokenDecoder,
  Token,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";
import { deserializeDigitalAsset, DigitalAsset } from "./digitalAsset";
import {
  findMasterEditionPda,
  findMetadataPda,
  findTokenRecordPda,
  getTokenRecordDecoder,
  TokenRecord,
  WithAddress,
} from ".";
import {
  Address,
  assertAccountExists,
  decodeAccount,
  EncodedAccount,
  FetchAccountsConfig,
  fetchEncodedAccounts,
  GetMultipleAccountsApi,
  MaybeEncodedAccount,
  Rpc,
} from "@solana/kit";

export type DigitalAssetWithToken = DigitalAsset & {
  token: WithAddress<Token>;
  tokenRecord?: WithAddress<TokenRecord>;
};

export async function fetchDigitalAssetWithToken(
  rpc: Rpc<GetMultipleAccountsApi>,
  mint: Address,
  token: Address,
  options?: FetchAccountsConfig
): Promise<DigitalAssetWithToken> {
  const [[metadataAddress], [masterEditionAddress], [tokenRecordAddress]] =
    await Promise.all([
      findMetadataPda({ mint }),
      findMasterEditionPda({ mint }),
      findTokenRecordPda({ mint, token }),
    ]);

  const [
    mintAccount,
    metadataAccount,
    editionAccount,
    tokenAccount,
    tokenRecordAccount,
  ] = await fetchEncodedAccounts(
    rpc,
    [mint, metadataAddress, masterEditionAddress, token, tokenRecordAddress],
    options
  );

  assertAccountExists(mintAccount);
  assertAccountExists(metadataAccount);
  assertAccountExists(tokenAccount);

  return deserializeDigitalAssetWithToken(
    mintAccount,
    metadataAccount,
    tokenAccount,
    editionAccount,
    tokenRecordAccount
  );
}

export async function fetchDigitalAssetWithAssociatedToken(
  rpc: Rpc<GetMultipleAccountsApi>,
  mint: Address,
  owner: Address,
  tokenProgram?: Address,
  options?: FetchAccountsConfig
): Promise<DigitalAssetWithToken> {
  const tokenProgramOrDefault = tokenProgram || TOKEN_PROGRAM_ADDRESS;
  const [token] = await findAssociatedTokenPda({
    mint,
    owner,
    tokenProgram: tokenProgramOrDefault,
  });
  return fetchDigitalAssetWithToken(rpc, mint, token, options);
}

export function deserializeDigitalAssetWithToken(
  mintAccount: EncodedAccount,
  metadataAccount: EncodedAccount,
  tokenAccount: EncodedAccount,
  editionAccount: MaybeEncodedAccount,
  tokenRecordAccount: MaybeEncodedAccount
): DigitalAssetWithToken {
  return {
    ...deserializeDigitalAsset(mintAccount, metadataAccount, editionAccount),
    token: {
      ...decodeAccount(tokenAccount, getTokenDecoder()).data,
      address: tokenAccount.address,
    },
    tokenRecord: tokenRecordAccount.exists
      ? {
          ...decodeAccount(tokenRecordAccount, getTokenRecordDecoder()).data,
          address: tokenRecordAccount.address,
        }
      : undefined,
  };
}
