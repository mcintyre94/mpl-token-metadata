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
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { findMasterEditionPda } from '../pdas';
import { MPL_TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';

export const THAW_DELEGATED_ACCOUNT_DISCRIMINATOR = 27;

export function getThawDelegatedAccountDiscriminatorBytes() {
  return getU8Encoder().encode(THAW_DELEGATED_ACCOUNT_DISCRIMINATOR);
}

export type ThawDelegatedAccountInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountDelegate extends string | AccountMeta<string> = string,
  TAccountTokenAccount extends string | AccountMeta<string> = string,
  TAccountEdition extends string | AccountMeta<string> = string,
  TAccountMint extends string | AccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | AccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountDelegate extends string
        ? WritableSignerAccount<TAccountDelegate> &
            AccountSignerMeta<TAccountDelegate>
        : TAccountDelegate,
      TAccountTokenAccount extends string
        ? WritableAccount<TAccountTokenAccount>
        : TAccountTokenAccount,
      TAccountEdition extends string
        ? ReadonlyAccount<TAccountEdition>
        : TAccountEdition,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type ThawDelegatedAccountInstructionData = { discriminator: number };

export type ThawDelegatedAccountInstructionDataArgs = {};

export function getThawDelegatedAccountInstructionDataEncoder(): FixedSizeEncoder<ThawDelegatedAccountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: THAW_DELEGATED_ACCOUNT_DISCRIMINATOR,
    })
  );
}

export function getThawDelegatedAccountInstructionDataDecoder(): FixedSizeDecoder<ThawDelegatedAccountInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getThawDelegatedAccountInstructionDataCodec(): FixedSizeCodec<
  ThawDelegatedAccountInstructionDataArgs,
  ThawDelegatedAccountInstructionData
> {
  return combineCodec(
    getThawDelegatedAccountInstructionDataEncoder(),
    getThawDelegatedAccountInstructionDataDecoder()
  );
}

export type ThawDelegatedAccountAsyncInput<
  TAccountDelegate extends string = string,
  TAccountTokenAccount extends string = string,
  TAccountEdition extends string = string,
  TAccountMint extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** Delegate */
  delegate: TransactionSigner<TAccountDelegate>;
  /** Token account to thaw */
  tokenAccount: Address<TAccountTokenAccount>;
  /** Edition */
  edition?: Address<TAccountEdition>;
  /** Token mint */
  mint: Address<TAccountMint>;
  /** Token Program */
  tokenProgram?: Address<TAccountTokenProgram>;
};

export async function getThawDelegatedAccountInstructionAsync<
  TAccountDelegate extends string,
  TAccountTokenAccount extends string,
  TAccountEdition extends string,
  TAccountMint extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: ThawDelegatedAccountAsyncInput<
    TAccountDelegate,
    TAccountTokenAccount,
    TAccountEdition,
    TAccountMint,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  ThawDelegatedAccountInstruction<
    TProgramAddress,
    TAccountDelegate,
    TAccountTokenAccount,
    TAccountEdition,
    TAccountMint,
    TAccountTokenProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    delegate: { value: input.delegate ?? null, isWritable: true },
    tokenAccount: { value: input.tokenAccount ?? null, isWritable: true },
    edition: { value: input.edition ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.edition.value) {
    accounts.edition.value = await findMasterEditionPda({
      mint: expectAddress(accounts.mint.value),
    });
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.delegate),
      getAccountMeta(accounts.tokenAccount),
      getAccountMeta(accounts.edition),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getThawDelegatedAccountInstructionDataEncoder().encode({}),
  } as ThawDelegatedAccountInstruction<
    TProgramAddress,
    TAccountDelegate,
    TAccountTokenAccount,
    TAccountEdition,
    TAccountMint,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ThawDelegatedAccountInput<
  TAccountDelegate extends string = string,
  TAccountTokenAccount extends string = string,
  TAccountEdition extends string = string,
  TAccountMint extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** Delegate */
  delegate: TransactionSigner<TAccountDelegate>;
  /** Token account to thaw */
  tokenAccount: Address<TAccountTokenAccount>;
  /** Edition */
  edition: Address<TAccountEdition>;
  /** Token mint */
  mint: Address<TAccountMint>;
  /** Token Program */
  tokenProgram?: Address<TAccountTokenProgram>;
};

export function getThawDelegatedAccountInstruction<
  TAccountDelegate extends string,
  TAccountTokenAccount extends string,
  TAccountEdition extends string,
  TAccountMint extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: ThawDelegatedAccountInput<
    TAccountDelegate,
    TAccountTokenAccount,
    TAccountEdition,
    TAccountMint,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): ThawDelegatedAccountInstruction<
  TProgramAddress,
  TAccountDelegate,
  TAccountTokenAccount,
  TAccountEdition,
  TAccountMint,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    delegate: { value: input.delegate ?? null, isWritable: true },
    tokenAccount: { value: input.tokenAccount ?? null, isWritable: true },
    edition: { value: input.edition ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.delegate),
      getAccountMeta(accounts.tokenAccount),
      getAccountMeta(accounts.edition),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getThawDelegatedAccountInstructionDataEncoder().encode({}),
  } as ThawDelegatedAccountInstruction<
    TProgramAddress,
    TAccountDelegate,
    TAccountTokenAccount,
    TAccountEdition,
    TAccountMint,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedThawDelegatedAccountInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Delegate */
    delegate: TAccountMetas[0];
    /** Token account to thaw */
    tokenAccount: TAccountMetas[1];
    /** Edition */
    edition: TAccountMetas[2];
    /** Token mint */
    mint: TAccountMetas[3];
    /** Token Program */
    tokenProgram: TAccountMetas[4];
  };
  data: ThawDelegatedAccountInstructionData;
};

export function parseThawDelegatedAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedThawDelegatedAccountInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
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
      delegate: getNextAccount(),
      tokenAccount: getNextAccount(),
      edition: getNextAccount(),
      mint: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getThawDelegatedAccountInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
