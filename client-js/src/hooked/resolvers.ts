import {
  expectAddress,
  expectSome,
  isTransactionSigner,
  ResolvedAccount,
} from "../generated/shared";
import {
  collectionDetails,
  CollectionDetailsArgs,
  CreatorArgs,
  printSupply,
  PrintSupplyArgs,
  TokenStandard,
  TokenStandardArgs,
} from "../generated";
import { isNonFungible } from "../digitalAsset";
import { Option, some, none } from "@solana/kit";

export function resolveIsNonFungibleOrIsMintSigner({
  accounts,
  args,
}: {
  accounts: { mint: ResolvedAccount };
  args: { tokenStandard?: TokenStandardArgs };
}): boolean {
  return (
    (args.tokenStandard && isNonFungible(args.tokenStandard)) ||
    (accounts.mint.value && isTransactionSigner(accounts.mint.value)) ||
    false
  );
}

export function resolveIsNonFungible({
  args,
}: {
  args: { tokenStandard?: TokenStandardArgs };
}): boolean {
  return (
    (args.tokenStandard !== undefined && isNonFungible(args.tokenStandard)) ||
    false
  );
}

export function resolveOptionalTokenOwner({
  accounts,
}: {
  accounts: {
    token: ResolvedAccount;
    authority: ResolvedAccount;
  };
}): Pick<ResolvedAccount, "value"> {
  if (accounts.token.value)
    return {
      value: null,
    };

  return {
    value: accounts.authority.value,
  };
}

export function resolveCollectionDetails({
  args,
}: {
  args: {
    isCollection?: boolean;
  };
}): Option<CollectionDetailsArgs> {
  return args.isCollection
    ? some(collectionDetails("V2", { padding: new Uint8Array(8).fill(0) }))
    : none();
}

// From mpl-toolbox getMintSize() function
// https://github.com/metaplex-foundation/mpl-toolbox/blob/6da82fb30f9ac3b21496186d73aeb8148848a9f8/clients/js/src/generated/accounts/mint.ts#L162
const MINT_SIZE = 82;
// From metaplex resolvers in mpl-token-metadata repo
const METADATA_SIZE = 607;
const MASTER_EDITION_SIZE: number = 20;
// From Umi
// https://github.com/metaplex-foundation/umi/blob/a5698a58c152e64620d6fa431dbf14d47f262813/packages/umi/src/Account.ts#L10-L11
const ACCOUNT_HEADER_SIZE = 128;

export function resolveCreateV1Bytes({
  args,
}: {
  args: { tokenStandard?: TokenStandardArgs };
}): number {
  const base = MINT_SIZE + METADATA_SIZE + 2 * ACCOUNT_HEADER_SIZE;
  if (isNonFungible(expectSome(args.tokenStandard))) {
    return base + MASTER_EDITION_SIZE + ACCOUNT_HEADER_SIZE;
  }
  return base;
}

export function resolveCreators({
  accounts,
}: {
  accounts: { authority: ResolvedAccount };
}): Option<CreatorArgs[]> {
  return some([
    {
      address: expectAddress(accounts.authority.value),
      share: 100,
      verified: true,
    },
  ]);
}

export function resolveDecimals({
  args,
}: {
  args: { tokenStandard?: TokenStandard };
}): Option<number> {
  return isNonFungible(expectSome(args.tokenStandard)) ? none() : some(0);
}

export function resolvePrintSupply({
  args,
}: {
  args: { tokenStandard?: TokenStandard };
}): Option<PrintSupplyArgs> {
  return isNonFungible(expectSome(args.tokenStandard))
    ? some(printSupply("Zero"))
    : none();
}
