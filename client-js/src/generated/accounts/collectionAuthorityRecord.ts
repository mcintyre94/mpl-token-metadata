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
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Account,
  type Address,
  type Codec,
  type Decoder,
  type EncodedAccount,
  type Encoder,
  type FetchAccountConfig,
  type FetchAccountsConfig,
  type MaybeAccount,
  type MaybeEncodedAccount,
  type Option,
  type OptionOrNullable,
} from '@solana/kit';
import {
  CollectionAuthorityRecordSeeds,
  findCollectionAuthorityRecordPda,
} from '../pdas';
import { Key, getKeyDecoder, getKeyEncoder } from '../types';

export const COLLECTION_AUTHORITY_RECORD_KEY = Key.CollectionAuthorityRecord;

export function getCollectionAuthorityRecordKeyBytes() {
  return getKeyEncoder().encode(COLLECTION_AUTHORITY_RECORD_KEY);
}

export type CollectionAuthorityRecord = {
  key: Key;
  bump: number;
  updateAuthority: Option<Address>;
};

export type CollectionAuthorityRecordArgs = {
  bump: number;
  updateAuthority: OptionOrNullable<Address>;
};

export function getCollectionAuthorityRecordEncoder(): Encoder<CollectionAuthorityRecordArgs> {
  return transformEncoder(
    getStructEncoder([
      ['key', getKeyEncoder()],
      ['bump', getU8Encoder()],
      ['updateAuthority', getOptionEncoder(getAddressEncoder())],
    ]),
    (value) => ({ ...value, key: COLLECTION_AUTHORITY_RECORD_KEY })
  );
}

export function getCollectionAuthorityRecordDecoder(): Decoder<CollectionAuthorityRecord> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['bump', getU8Decoder()],
    ['updateAuthority', getOptionDecoder(getAddressDecoder())],
  ]);
}

export function getCollectionAuthorityRecordCodec(): Codec<
  CollectionAuthorityRecordArgs,
  CollectionAuthorityRecord
> {
  return combineCodec(
    getCollectionAuthorityRecordEncoder(),
    getCollectionAuthorityRecordDecoder()
  );
}

export function decodeCollectionAuthorityRecord<
  TAddress extends string = string,
>(
  encodedAccount: EncodedAccount<TAddress>
): Account<CollectionAuthorityRecord, TAddress>;
export function decodeCollectionAuthorityRecord<
  TAddress extends string = string,
>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<CollectionAuthorityRecord, TAddress>;
export function decodeCollectionAuthorityRecord<
  TAddress extends string = string,
>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
):
  | Account<CollectionAuthorityRecord, TAddress>
  | MaybeAccount<CollectionAuthorityRecord, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getCollectionAuthorityRecordDecoder()
  );
}

export async function fetchCollectionAuthorityRecord<
  TAddress extends string = string,
>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<CollectionAuthorityRecord, TAddress>> {
  const maybeAccount = await fetchMaybeCollectionAuthorityRecord(
    rpc,
    address,
    config
  );
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeCollectionAuthorityRecord<
  TAddress extends string = string,
>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<CollectionAuthorityRecord, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeCollectionAuthorityRecord(maybeAccount);
}

export async function fetchAllCollectionAuthorityRecord(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<CollectionAuthorityRecord>[]> {
  const maybeAccounts = await fetchAllMaybeCollectionAuthorityRecord(
    rpc,
    addresses,
    config
  );
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeCollectionAuthorityRecord(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<CollectionAuthorityRecord>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) =>
    decodeCollectionAuthorityRecord(maybeAccount)
  );
}

export async function fetchCollectionAuthorityRecordFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: CollectionAuthorityRecordSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Account<CollectionAuthorityRecord>> {
  const maybeAccount = await fetchMaybeCollectionAuthorityRecordFromSeeds(
    rpc,
    seeds,
    config
  );
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeCollectionAuthorityRecordFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: CollectionAuthorityRecordSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeAccount<CollectionAuthorityRecord>> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findCollectionAuthorityRecordPda(seeds, {
    programAddress,
  });
  return await fetchMaybeCollectionAuthorityRecord(rpc, address, fetchConfig);
}
