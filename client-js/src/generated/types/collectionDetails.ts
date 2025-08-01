/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type GetDiscriminatedUnionVariant,
  type GetDiscriminatedUnionVariantContent,
  type ReadonlyUint8Array,
} from '@solana/kit';

export type CollectionDetails =
  | { __kind: 'V1'; size: bigint }
  | { __kind: 'V2'; padding: ReadonlyUint8Array };

export type CollectionDetailsArgs =
  | { __kind: 'V1'; size: number | bigint }
  | { __kind: 'V2'; padding: ReadonlyUint8Array };

export function getCollectionDetailsEncoder(): FixedSizeEncoder<CollectionDetailsArgs> {
  return getDiscriminatedUnionEncoder([
    ['V1', getStructEncoder([['size', getU64Encoder()]])],
    [
      'V2',
      getStructEncoder([['padding', fixEncoderSize(getBytesEncoder(), 8)]]),
    ],
  ]) as FixedSizeEncoder<CollectionDetailsArgs>;
}

export function getCollectionDetailsDecoder(): FixedSizeDecoder<CollectionDetails> {
  return getDiscriminatedUnionDecoder([
    ['V1', getStructDecoder([['size', getU64Decoder()]])],
    [
      'V2',
      getStructDecoder([['padding', fixDecoderSize(getBytesDecoder(), 8)]]),
    ],
  ]) as FixedSizeDecoder<CollectionDetails>;
}

export function getCollectionDetailsCodec(): FixedSizeCodec<
  CollectionDetailsArgs,
  CollectionDetails
> {
  return combineCodec(
    getCollectionDetailsEncoder(),
    getCollectionDetailsDecoder()
  );
}

// Data Enum Helpers.
export function collectionDetails(
  kind: 'V1',
  data: GetDiscriminatedUnionVariantContent<
    CollectionDetailsArgs,
    '__kind',
    'V1'
  >
): GetDiscriminatedUnionVariant<CollectionDetailsArgs, '__kind', 'V1'>;
export function collectionDetails(
  kind: 'V2',
  data: GetDiscriminatedUnionVariantContent<
    CollectionDetailsArgs,
    '__kind',
    'V2'
  >
): GetDiscriminatedUnionVariant<CollectionDetailsArgs, '__kind', 'V2'>;
export function collectionDetails<
  K extends CollectionDetailsArgs['__kind'],
  Data,
>(kind: K, data?: Data) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isCollectionDetails<K extends CollectionDetails['__kind']>(
  kind: K,
  value: CollectionDetails
): value is CollectionDetails & { __kind: K } {
  return value.__kind === kind;
}
