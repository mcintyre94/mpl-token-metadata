/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
  none,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type GetDiscriminatedUnionVariant,
  type GetDiscriminatedUnionVariantContent,
  type Option,
  type OptionOrNullable,
} from '@solana/kit';
import {
  getCollectionDecoder,
  getCollectionDetailsDecoder,
  getCollectionDetailsEncoder,
  getCollectionEncoder,
  getCreatorDecoder,
  getCreatorEncoder,
  getPrintSupplyDecoder,
  getPrintSupplyEncoder,
  getTokenStandardDecoder,
  getTokenStandardEncoder,
  getUsesDecoder,
  getUsesEncoder,
  type Collection,
  type CollectionArgs,
  type CollectionDetails,
  type CollectionDetailsArgs,
  type Creator,
  type CreatorArgs,
  type PrintSupply,
  type PrintSupplyArgs,
  type TokenStandard,
  type TokenStandardArgs,
  type Uses,
  type UsesArgs,
} from '.';

export type CreateArgs = {
  __kind: 'V1';
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Option<Array<Creator>>;
  primarySaleHappened: boolean;
  isMutable: boolean;
  tokenStandard: TokenStandard;
  collection: Option<Collection>;
  uses: Option<Uses>;
  collectionDetails: Option<CollectionDetails>;
  ruleSet: Option<Address>;
  decimals: Option<number>;
  printSupply: Option<PrintSupply>;
};

export type CreateArgsArgs = {
  __kind: 'V1';
  name: string;
  symbol?: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: OptionOrNullable<Array<CreatorArgs>>;
  primarySaleHappened?: boolean;
  isMutable?: boolean;
  tokenStandard: TokenStandardArgs;
  collection?: OptionOrNullable<CollectionArgs>;
  uses?: OptionOrNullable<UsesArgs>;
  collectionDetails?: OptionOrNullable<CollectionDetailsArgs>;
  ruleSet?: OptionOrNullable<Address>;
  decimals: OptionOrNullable<number>;
  printSupply: OptionOrNullable<PrintSupplyArgs>;
};

export function getCreateArgsEncoder(): Encoder<CreateArgsArgs> {
  return getDiscriminatedUnionEncoder([
    [
      'V1',
      transformEncoder(
        getStructEncoder([
          ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
          ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
          ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
          ['sellerFeeBasisPoints', getU16Encoder()],
          ['creators', getOptionEncoder(getArrayEncoder(getCreatorEncoder()))],
          ['primarySaleHappened', getBooleanEncoder()],
          ['isMutable', getBooleanEncoder()],
          ['tokenStandard', getTokenStandardEncoder()],
          ['collection', getOptionEncoder(getCollectionEncoder())],
          ['uses', getOptionEncoder(getUsesEncoder())],
          [
            'collectionDetails',
            getOptionEncoder(getCollectionDetailsEncoder()),
          ],
          ['ruleSet', getOptionEncoder(getAddressEncoder())],
          ['decimals', getOptionEncoder(getU8Encoder())],
          ['printSupply', getOptionEncoder(getPrintSupplyEncoder())],
        ]),
        (value) => ({
          ...value,
          symbol: value.symbol ?? '',
          primarySaleHappened: value.primarySaleHappened ?? false,
          isMutable: value.isMutable ?? true,
          collection: value.collection ?? none(),
          uses: value.uses ?? none(),
          collectionDetails: value.collectionDetails ?? none(),
          ruleSet: value.ruleSet ?? none(),
        })
      ),
    ],
  ]);
}

export function getCreateArgsDecoder(): Decoder<CreateArgs> {
  return getDiscriminatedUnionDecoder([
    [
      'V1',
      getStructDecoder([
        ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
        ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
        ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
        ['sellerFeeBasisPoints', getU16Decoder()],
        ['creators', getOptionDecoder(getArrayDecoder(getCreatorDecoder()))],
        ['primarySaleHappened', getBooleanDecoder()],
        ['isMutable', getBooleanDecoder()],
        ['tokenStandard', getTokenStandardDecoder()],
        ['collection', getOptionDecoder(getCollectionDecoder())],
        ['uses', getOptionDecoder(getUsesDecoder())],
        ['collectionDetails', getOptionDecoder(getCollectionDetailsDecoder())],
        ['ruleSet', getOptionDecoder(getAddressDecoder())],
        ['decimals', getOptionDecoder(getU8Decoder())],
        ['printSupply', getOptionDecoder(getPrintSupplyDecoder())],
      ]),
    ],
  ]);
}

export function getCreateArgsCodec(): Codec<CreateArgsArgs, CreateArgs> {
  return combineCodec(getCreateArgsEncoder(), getCreateArgsDecoder());
}

// Data Enum Helpers.
export function createArgs(
  kind: 'V1',
  data: GetDiscriminatedUnionVariantContent<CreateArgsArgs, '__kind', 'V1'>
): GetDiscriminatedUnionVariant<CreateArgsArgs, '__kind', 'V1'>;
export function createArgs<K extends CreateArgsArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isCreateArgs<K extends CreateArgs['__kind']>(
  kind: K,
  value: CreateArgs
): value is CreateArgs & { __kind: K } {
  return value.__kind === kind;
}
