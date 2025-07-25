/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
} from '@solana/kit';

export enum TokenState {
  Unlocked,
  Locked,
  Listed,
}

export type TokenStateArgs = TokenState;

export function getTokenStateEncoder(): FixedSizeEncoder<TokenStateArgs> {
  return getEnumEncoder(TokenState);
}

export function getTokenStateDecoder(): FixedSizeDecoder<TokenState> {
  return getEnumDecoder(TokenState);
}

export function getTokenStateCodec(): FixedSizeCodec<
  TokenStateArgs,
  TokenState
> {
  return combineCodec(getTokenStateEncoder(), getTokenStateDecoder());
}
