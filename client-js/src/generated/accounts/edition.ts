/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  transformEncoder,
  type Account,
  type Address,
  type EncodedAccount,
  type FetchAccountConfig,
  type FetchAccountsConfig,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type MaybeAccount,
  type MaybeEncodedAccount,
} from '@solana/kit';
import { Key, getKeyDecoder, getKeyEncoder } from '../types';

export const EDITION_KEY = Key.EditionV1;

export function getEditionKeyBytes() {
  return getKeyEncoder().encode(EDITION_KEY);
}

export type Edition = { key: Key; parent: Address; edition: bigint };

export type EditionArgs = { parent: Address; edition: number | bigint };

export function getEditionEncoder(): FixedSizeEncoder<EditionArgs> {
  return transformEncoder(
    getStructEncoder([
      ['key', getKeyEncoder()],
      ['parent', getAddressEncoder()],
      ['edition', getU64Encoder()],
    ]),
    (value) => ({ ...value, key: EDITION_KEY })
  );
}

export function getEditionDecoder(): FixedSizeDecoder<Edition> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['parent', getAddressDecoder()],
    ['edition', getU64Decoder()],
  ]);
}

export function getEditionCodec(): FixedSizeCodec<EditionArgs, Edition> {
  return combineCodec(getEditionEncoder(), getEditionDecoder());
}

export function decodeEdition<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<Edition, TAddress>;
export function decodeEdition<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<Edition, TAddress>;
export function decodeEdition<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<Edition, TAddress> | MaybeAccount<Edition, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getEditionDecoder()
  );
}

export async function fetchEdition<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<Edition, TAddress>> {
  const maybeAccount = await fetchMaybeEdition(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeEdition<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<Edition, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeEdition(maybeAccount);
}

export async function fetchAllEdition(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<Edition>[]> {
  const maybeAccounts = await fetchAllMaybeEdition(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeEdition(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<Edition>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeEdition(maybeAccount));
}

export function getEditionSize(): number {
  return 41;
}
