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
  type WritableAccount,
} from '@solana/kit';
import { MPL_TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const UPDATE_PRIMARY_SALE_HAPPENED_VIA_TOKEN_DISCRIMINATOR = 4;

export function getUpdatePrimarySaleHappenedViaTokenDiscriminatorBytes() {
  return getU8Encoder().encode(
    UPDATE_PRIMARY_SALE_HAPPENED_VIA_TOKEN_DISCRIMINATOR
  );
}

export type UpdatePrimarySaleHappenedViaTokenInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata extends string | AccountMeta<string> = string,
  TAccountOwner extends string | AccountMeta<string> = string,
  TAccountToken extends string | AccountMeta<string> = string,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountOwner extends string
        ? ReadonlySignerAccount<TAccountOwner> &
            AccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountToken extends string
        ? ReadonlyAccount<TAccountToken>
        : TAccountToken,
      ...TRemainingAccounts,
    ]
  >;

export type UpdatePrimarySaleHappenedViaTokenInstructionData = {
  discriminator: number;
};

export type UpdatePrimarySaleHappenedViaTokenInstructionDataArgs = {};

export function getUpdatePrimarySaleHappenedViaTokenInstructionDataEncoder(): FixedSizeEncoder<UpdatePrimarySaleHappenedViaTokenInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: UPDATE_PRIMARY_SALE_HAPPENED_VIA_TOKEN_DISCRIMINATOR,
    })
  );
}

export function getUpdatePrimarySaleHappenedViaTokenInstructionDataDecoder(): FixedSizeDecoder<UpdatePrimarySaleHappenedViaTokenInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getUpdatePrimarySaleHappenedViaTokenInstructionDataCodec(): FixedSizeCodec<
  UpdatePrimarySaleHappenedViaTokenInstructionDataArgs,
  UpdatePrimarySaleHappenedViaTokenInstructionData
> {
  return combineCodec(
    getUpdatePrimarySaleHappenedViaTokenInstructionDataEncoder(),
    getUpdatePrimarySaleHappenedViaTokenInstructionDataDecoder()
  );
}

export type UpdatePrimarySaleHappenedViaTokenInput<
  TAccountMetadata extends string = string,
  TAccountOwner extends string = string,
  TAccountToken extends string = string,
> = {
  /** Metadata key (pda of ['metadata', program id, mint id]) */
  metadata: Address<TAccountMetadata>;
  /** Owner on the token account */
  owner: TransactionSigner<TAccountOwner>;
  /** Account containing tokens from the metadata's mint */
  token: Address<TAccountToken>;
};

export function getUpdatePrimarySaleHappenedViaTokenInstruction<
  TAccountMetadata extends string,
  TAccountOwner extends string,
  TAccountToken extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: UpdatePrimarySaleHappenedViaTokenInput<
    TAccountMetadata,
    TAccountOwner,
    TAccountToken
  >,
  config?: { programAddress?: TProgramAddress }
): UpdatePrimarySaleHappenedViaTokenInstruction<
  TProgramAddress,
  TAccountMetadata,
  TAccountOwner,
  TAccountToken
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
    token: { value: input.token ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.token),
    ],
    programAddress,
    data: getUpdatePrimarySaleHappenedViaTokenInstructionDataEncoder().encode(
      {}
    ),
  } as UpdatePrimarySaleHappenedViaTokenInstruction<
    TProgramAddress,
    TAccountMetadata,
    TAccountOwner,
    TAccountToken
  >;

  return instruction;
}

export type ParsedUpdatePrimarySaleHappenedViaTokenInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Metadata key (pda of ['metadata', program id, mint id]) */
    metadata: TAccountMetas[0];
    /** Owner on the token account */
    owner: TAccountMetas[1];
    /** Account containing tokens from the metadata's mint */
    token: TAccountMetas[2];
  };
  data: UpdatePrimarySaleHappenedViaTokenInstructionData;
};

export function parseUpdatePrimarySaleHappenedViaTokenInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedUpdatePrimarySaleHappenedViaTokenInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
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
      metadata: getNextAccount(),
      owner: getNextAccount(),
      token: getNextAccount(),
    },
    data: getUpdatePrimarySaleHappenedViaTokenInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
