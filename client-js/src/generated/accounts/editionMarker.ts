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
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
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
  type ReadonlyUint8Array,
} from '@solana/kit';
import { EditionMarkerSeeds, findEditionMarkerPda } from '../pdas';
import { Key, getKeyDecoder, getKeyEncoder } from '../types';

export const EDITION_MARKER_KEY = Key.EditionMarker;

export function getEditionMarkerKeyBytes() {
  return getKeyEncoder().encode(EDITION_MARKER_KEY);
}

export type EditionMarker = { key: Key; ledger: ReadonlyUint8Array };

export type EditionMarkerArgs = { ledger: ReadonlyUint8Array };

export function getEditionMarkerEncoder(): FixedSizeEncoder<EditionMarkerArgs> {
  return transformEncoder(
    getStructEncoder([
      ['key', getKeyEncoder()],
      ['ledger', fixEncoderSize(getBytesEncoder(), 31)],
    ]),
    (value) => ({ ...value, key: EDITION_MARKER_KEY })
  );
}

export function getEditionMarkerDecoder(): FixedSizeDecoder<EditionMarker> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['ledger', fixDecoderSize(getBytesDecoder(), 31)],
  ]);
}

export function getEditionMarkerCodec(): FixedSizeCodec<
  EditionMarkerArgs,
  EditionMarker
> {
  return combineCodec(getEditionMarkerEncoder(), getEditionMarkerDecoder());
}

export function decodeEditionMarker<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<EditionMarker, TAddress>;
export function decodeEditionMarker<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<EditionMarker, TAddress>;
export function decodeEditionMarker<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<EditionMarker, TAddress> | MaybeAccount<EditionMarker, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getEditionMarkerDecoder()
  );
}

export async function fetchEditionMarker<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<EditionMarker, TAddress>> {
  const maybeAccount = await fetchMaybeEditionMarker(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeEditionMarker<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<EditionMarker, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeEditionMarker(maybeAccount);
}

export async function fetchAllEditionMarker(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<EditionMarker>[]> {
  const maybeAccounts = await fetchAllMaybeEditionMarker(
    rpc,
    addresses,
    config
  );
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeEditionMarker(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<EditionMarker>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeEditionMarker(maybeAccount));
}

export function getEditionMarkerSize(): number {
  return 32;
}

export async function fetchEditionMarkerFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: EditionMarkerSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Account<EditionMarker>> {
  const maybeAccount = await fetchMaybeEditionMarkerFromSeeds(
    rpc,
    seeds,
    config
  );
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeEditionMarkerFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: EditionMarkerSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeAccount<EditionMarker>> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findEditionMarkerPda(seeds, { programAddress });
  return await fetchMaybeEditionMarker(rpc, address, fetchConfig);
}
