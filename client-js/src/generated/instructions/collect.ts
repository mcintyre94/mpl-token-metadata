/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type AccountMeta,
  type AccountSignerMeta,
  type Address,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
} from '@solana/kit';
import { MPL_TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const COLLECT_DISCRIMINATOR = 54;

export function getCollectDiscriminatorBytes() {
  return getU8Encoder().encode(COLLECT_DISCRIMINATOR);
}

export type CollectInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountAuthority extends string | AccountMeta<string> = string,
  TAccountRecipient extends string | AccountMeta<string> = string,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            AccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountRecipient extends string
        ? ReadonlyAccount<TAccountRecipient>
        : TAccountRecipient,
      ...TRemainingAccounts,
    ]
  >;

export type CollectInstructionData = { discriminator: number };

export type CollectInstructionDataArgs = {};

export function getCollectInstructionDataEncoder(): FixedSizeEncoder<CollectInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: COLLECT_DISCRIMINATOR })
  );
}

export function getCollectInstructionDataDecoder(): FixedSizeDecoder<CollectInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getCollectInstructionDataCodec(): FixedSizeCodec<
  CollectInstructionDataArgs,
  CollectInstructionData
> {
  return combineCodec(
    getCollectInstructionDataEncoder(),
    getCollectInstructionDataDecoder()
  );
}

export type CollectInput<
  TAccountAuthority extends string = string,
  TAccountRecipient extends string = string,
> = {
  /** Authority to collect fees */
  authority: TransactionSigner<TAccountAuthority>;
  /** The account to transfer collected fees to */
  recipient: Address<TAccountRecipient>;
};

export function getCollectInstruction<
  TAccountAuthority extends string,
  TAccountRecipient extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: CollectInput<TAccountAuthority, TAccountRecipient>,
  config?: { programAddress?: TProgramAddress }
): CollectInstruction<TProgramAddress, TAccountAuthority, TAccountRecipient> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: false },
    recipient: { value: input.recipient ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.recipient),
    ],
    programAddress,
    data: getCollectInstructionDataEncoder().encode({}),
  } as CollectInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountRecipient
  >;

  return instruction;
}

export type ParsedCollectInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Authority to collect fees */
    authority: TAccountMetas[0];
    /** The account to transfer collected fees to */
    recipient: TAccountMetas[1];
  };
  data: CollectInstructionData;
};

export function parseCollectInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedCollectInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      authority: getNextAccount(),
      recipient: getNextAccount(),
    },
    data: getCollectInstructionDataDecoder().decode(instruction.data),
  };
}
