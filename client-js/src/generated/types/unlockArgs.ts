/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  type Codec,
  type Decoder,
  type Encoder,
  type GetDiscriminatedUnionVariant,
  type GetDiscriminatedUnionVariantContent,
  type Option,
  type OptionOrNullable,
} from '@solana/kit';
import {
  getAuthorizationDataDecoder,
  getAuthorizationDataEncoder,
  type AuthorizationData,
  type AuthorizationDataArgs,
} from '.';

export type UnlockArgs = {
  __kind: 'V1';
  authorizationData: Option<AuthorizationData>;
};

export type UnlockArgsArgs = {
  __kind: 'V1';
  authorizationData: OptionOrNullable<AuthorizationDataArgs>;
};

export function getUnlockArgsEncoder(): Encoder<UnlockArgsArgs> {
  return getDiscriminatedUnionEncoder([
    [
      'V1',
      getStructEncoder([
        ['authorizationData', getOptionEncoder(getAuthorizationDataEncoder())],
      ]),
    ],
  ]);
}

export function getUnlockArgsDecoder(): Decoder<UnlockArgs> {
  return getDiscriminatedUnionDecoder([
    [
      'V1',
      getStructDecoder([
        ['authorizationData', getOptionDecoder(getAuthorizationDataDecoder())],
      ]),
    ],
  ]);
}

export function getUnlockArgsCodec(): Codec<UnlockArgsArgs, UnlockArgs> {
  return combineCodec(getUnlockArgsEncoder(), getUnlockArgsDecoder());
}

// Data Enum Helpers.
export function unlockArgs(
  kind: 'V1',
  data: GetDiscriminatedUnionVariantContent<UnlockArgsArgs, '__kind', 'V1'>
): GetDiscriminatedUnionVariant<UnlockArgsArgs, '__kind', 'V1'>;
export function unlockArgs<K extends UnlockArgsArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isUnlockArgs<K extends UnlockArgs['__kind']>(
  kind: K,
  value: UnlockArgs
): value is UnlockArgs & { __kind: K } {
  return value.__kind === kind;
}
