import { getMintSize } from '@metaplex-foundation/mpl-toolbox';
import {
  ACCOUNT_HEADER_SIZE,
  Context,
  Option,
  isSigner,
  none,
  some,
} from '@metaplex-foundation/umi';
import { isNonFungible } from '../digitalAsset';
import {
  CollectionDetailsArgs,
  CreatorArgs,
  PrintSupplyArgs,
  ResolvedAccountsWithIndices,
  TokenStandard,
  collectionDetails,
  expectPublicKey,
  expectSome,
  printSupply,
} from '../generated';

const METADATA_SIZE: number = 607;

const MASTER_EDITION_SIZE: number = 20;

export const resolveCollectionDetails = (
  context: any,
  accounts: any,
  args: { isCollection?: boolean },
  ...rest: any[]
): Option<CollectionDetailsArgs> =>
  args.isCollection
    ? some(collectionDetails('V2', { padding: new Uint8Array(8).fill(0) }))
    : none();

export const resolveIsNonFungible = (
  context: any,
  accounts: any,
  args: { tokenStandard?: TokenStandard },
  ...rest: any[]
): boolean => isNonFungible(expectSome(args.tokenStandard));

export const resolveDecimals = (
  context: any,
  accounts: any,
  args: { tokenStandard?: TokenStandard },
  ...rest: any[]
): Option<number> =>
  isNonFungible(expectSome(args.tokenStandard)) ? none() : some(0);

export const resolvePrintSupply = (
  context: any,
  accounts: any,
  args: { tokenStandard?: TokenStandard },
  ...rest: any[]
): Option<PrintSupplyArgs> =>
  isNonFungible(expectSome(args.tokenStandard))
    ? some(printSupply('Zero'))
    : none();

export const resolveCreators = (
  context: any,
  accounts: ResolvedAccountsWithIndices,
  ...rest: any[]
): Option<CreatorArgs[]> =>
  some([
    {
      address: expectPublicKey(accounts.authority.value),
      share: 100,
      verified: true,
    },
  ]);

export const resolveCreateV1Bytes = (
  context: any,
  accounts: any,
  args: { tokenStandard?: TokenStandard },
  ...rest: any[]
): number => {
  const base = getMintSize() + METADATA_SIZE + 2 * ACCOUNT_HEADER_SIZE;
  if (isNonFungible(expectSome(args.tokenStandard))) {
    return base + MASTER_EDITION_SIZE + ACCOUNT_HEADER_SIZE;
  }
  return base;
};

export const resolveOptionalTokenOwner = (
  context: Pick<Context, 'identity'>,
  accounts: ResolvedAccountsWithIndices,
  ...rest: any[]
) =>
  accounts.token.value
    ? { value: null }
    : { value: context.identity.publicKey };

export const resolveIsNonFungibleOrIsMintSigner = (
  context: any,
  accounts: ResolvedAccountsWithIndices,
  args: { tokenStandard?: TokenStandard },
  ...rest: any[]
): boolean =>
  isNonFungible(expectSome(args.tokenStandard)) ||
  isSigner(expectSome(accounts.mint.value));
