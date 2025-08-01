import {
  Account,
  Address,
  decodeAccount,
  EncodedAccount,
  MaybeAccount,
  MaybeEncodedAccount,
  unwrapOption,
} from "@solana/kit";
import {
  Edition,
  getEditionDecoder,
  getKeyDecoder,
  getMasterEditionDecoder,
  getMetadataDecoder,
  Key,
  MasterEdition,
  Metadata,
  TokenStandard,
} from "./generated";
import { getMintDecoder, Mint } from "@solana-program/token";
import { WithAddress } from "./types";

export type DigitalAsset = {
  address: Address;
  mint: WithAddress<Mint>;
  metadata: WithAddress<Metadata>;
  edition?:
    | ({ isOriginal: true } & WithAddress<MasterEdition>)
    | ({ isOriginal: false } & WithAddress<Edition>);
};

export const isFungible = (tokenStandard: TokenStandard): boolean =>
  tokenStandard === TokenStandard.Fungible ||
  tokenStandard === TokenStandard.FungibleAsset;

export const isNonFungible = (tokenStandard: TokenStandard): boolean =>
  !isFungible(tokenStandard);

export function deserializeDigitalAsset(
  mintAccount: EncodedAccount,
  metadataAccount: EncodedAccount,
  editionAccount: MaybeEncodedAccount
): DigitalAsset {
  const mint = decodeAccount(mintAccount, getMintDecoder());
  const metadata = decodeAccount(metadataAccount, getMetadataDecoder());

  const tokenStandard = unwrapOption(metadata.data.tokenStandard);
  if (tokenStandard && isNonFungible(tokenStandard) && !editionAccount) {
    // TODO: Custom error.
    throw new Error(
      "Edition account must be provided for non-fungible assets."
    );
  }

  const digitalAsset: DigitalAsset = {
    address: mint.address,
    mint: { ...mint.data, address: mint.address },
    metadata: { ...metadata.data, address: metadata.address },
  };
  if (!editionAccount.exists) return digitalAsset;

  const editionKey = getKeyDecoder().decode(editionAccount.data);
  let edition: DigitalAsset["edition"];
  if (
    editionKey === Key.MasterEditionV1 ||
    editionKey === Key.MasterEditionV2
  ) {
    edition = {
      isOriginal: true,
      address: editionAccount.address,
      ...decodeAccount(editionAccount, getMasterEditionDecoder()).data,
    };
  } else if (editionKey === Key.EditionV1) {
    edition = {
      isOriginal: false,
      address: editionAccount.address,
      ...decodeAccount(editionAccount, getEditionDecoder()).data,
    };
  } else {
    // TODO: Custom error.
    throw new Error(`Invalid key "${editionKey}" for edition account.`);
  }

  return { ...digitalAsset, edition };
}
