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
  getU64Decoder,
  getU64Encoder,
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
import { TokenRecordSeeds, findTokenRecordPda } from '../pdas';
import {
  Key,
  getKeyDecoder,
  getKeyEncoder,
  getTokenDelegateRoleDecoder,
  getTokenDelegateRoleEncoder,
  getTokenStateDecoder,
  getTokenStateEncoder,
  type TokenDelegateRole,
  type TokenDelegateRoleArgs,
  type TokenState,
  type TokenStateArgs,
} from '../types';

export const TOKEN_RECORD_KEY = Key.TokenRecord;

export function getTokenRecordKeyBytes() {
  return getKeyEncoder().encode(TOKEN_RECORD_KEY);
}

export type TokenRecord = {
  key: Key;
  bump: number;
  state: TokenState;
  ruleSetRevision: Option<bigint>;
  delegate: Option<Address>;
  delegateRole: Option<TokenDelegateRole>;
  lockedTransfer: Option<Address>;
};

export type TokenRecordArgs = {
  bump: number;
  state: TokenStateArgs;
  ruleSetRevision: OptionOrNullable<number | bigint>;
  delegate: OptionOrNullable<Address>;
  delegateRole: OptionOrNullable<TokenDelegateRoleArgs>;
  lockedTransfer: OptionOrNullable<Address>;
};

export function getTokenRecordEncoder(): Encoder<TokenRecordArgs> {
  return transformEncoder(
    getStructEncoder([
      ['key', getKeyEncoder()],
      ['bump', getU8Encoder()],
      ['state', getTokenStateEncoder()],
      ['ruleSetRevision', getOptionEncoder(getU64Encoder())],
      ['delegate', getOptionEncoder(getAddressEncoder())],
      ['delegateRole', getOptionEncoder(getTokenDelegateRoleEncoder())],
      ['lockedTransfer', getOptionEncoder(getAddressEncoder())],
    ]),
    (value) => ({ ...value, key: TOKEN_RECORD_KEY })
  );
}

export function getTokenRecordDecoder(): Decoder<TokenRecord> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['bump', getU8Decoder()],
    ['state', getTokenStateDecoder()],
    ['ruleSetRevision', getOptionDecoder(getU64Decoder())],
    ['delegate', getOptionDecoder(getAddressDecoder())],
    ['delegateRole', getOptionDecoder(getTokenDelegateRoleDecoder())],
    ['lockedTransfer', getOptionDecoder(getAddressDecoder())],
  ]);
}

export function getTokenRecordCodec(): Codec<TokenRecordArgs, TokenRecord> {
  return combineCodec(getTokenRecordEncoder(), getTokenRecordDecoder());
}

export function decodeTokenRecord<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<TokenRecord, TAddress>;
export function decodeTokenRecord<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<TokenRecord, TAddress>;
export function decodeTokenRecord<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<TokenRecord, TAddress> | MaybeAccount<TokenRecord, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getTokenRecordDecoder()
  );
}

export async function fetchTokenRecord<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<TokenRecord, TAddress>> {
  const maybeAccount = await fetchMaybeTokenRecord(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeTokenRecord<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<TokenRecord, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeTokenRecord(maybeAccount);
}

export async function fetchAllTokenRecord(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<TokenRecord>[]> {
  const maybeAccounts = await fetchAllMaybeTokenRecord(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeTokenRecord(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<TokenRecord>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeTokenRecord(maybeAccount));
}

export function getTokenRecordSize(): number {
  return 80;
}

export async function fetchTokenRecordFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: TokenRecordSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Account<TokenRecord>> {
  const maybeAccount = await fetchMaybeTokenRecordFromSeeds(rpc, seeds, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeTokenRecordFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: TokenRecordSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeAccount<TokenRecord>> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findTokenRecordPda(seeds, { programAddress });
  return await fetchMaybeTokenRecord(rpc, address, fetchConfig);
}
