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
import {
  getMintPrintingTokensViaTokenArgsDecoder,
  getMintPrintingTokensViaTokenArgsEncoder,
  type MintPrintingTokensViaTokenArgs,
  type MintPrintingTokensViaTokenArgsArgs,
} from '../types';

export const DEPRECATED_MINT_PRINTING_TOKENS_DISCRIMINATOR = 9;

export function getDeprecatedMintPrintingTokensDiscriminatorBytes() {
  return getU8Encoder().encode(DEPRECATED_MINT_PRINTING_TOKENS_DISCRIMINATOR);
}

export type DeprecatedMintPrintingTokensInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountDestination extends string | AccountMeta<string> = string,
  TAccountPrintingMint extends string | AccountMeta<string> = string,
  TAccountUpdateAuthority extends string | AccountMeta<string> = string,
  TAccountMetadata extends string | AccountMeta<string> = string,
  TAccountMasterEdition extends string | AccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | AccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountRent extends
    | string
    | AccountMeta<string> = 'SysvarRent111111111111111111111111111111111',
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountDestination extends string
        ? WritableAccount<TAccountDestination>
        : TAccountDestination,
      TAccountPrintingMint extends string
        ? WritableAccount<TAccountPrintingMint>
        : TAccountPrintingMint,
      TAccountUpdateAuthority extends string
        ? ReadonlySignerAccount<TAccountUpdateAuthority> &
            AccountSignerMeta<TAccountUpdateAuthority>
        : TAccountUpdateAuthority,
      TAccountMetadata extends string
        ? ReadonlyAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountMasterEdition extends string
        ? ReadonlyAccount<TAccountMasterEdition>
        : TAccountMasterEdition,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountRent extends string
        ? ReadonlyAccount<TAccountRent>
        : TAccountRent,
      ...TRemainingAccounts,
    ]
  >;

export type DeprecatedMintPrintingTokensInstructionData = {
  discriminator: number;
  mintPrintingTokensViaTokenArgs: MintPrintingTokensViaTokenArgs;
};

export type DeprecatedMintPrintingTokensInstructionDataArgs = {
  mintPrintingTokensViaTokenArgs: MintPrintingTokensViaTokenArgsArgs;
};

export function getDeprecatedMintPrintingTokensInstructionDataEncoder(): FixedSizeEncoder<DeprecatedMintPrintingTokensInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      [
        'mintPrintingTokensViaTokenArgs',
        getMintPrintingTokensViaTokenArgsEncoder(),
      ],
    ]),
    (value) => ({
      ...value,
      discriminator: DEPRECATED_MINT_PRINTING_TOKENS_DISCRIMINATOR,
    })
  );
}

export function getDeprecatedMintPrintingTokensInstructionDataDecoder(): FixedSizeDecoder<DeprecatedMintPrintingTokensInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    [
      'mintPrintingTokensViaTokenArgs',
      getMintPrintingTokensViaTokenArgsDecoder(),
    ],
  ]);
}

export function getDeprecatedMintPrintingTokensInstructionDataCodec(): FixedSizeCodec<
  DeprecatedMintPrintingTokensInstructionDataArgs,
  DeprecatedMintPrintingTokensInstructionData
> {
  return combineCodec(
    getDeprecatedMintPrintingTokensInstructionDataEncoder(),
    getDeprecatedMintPrintingTokensInstructionDataDecoder()
  );
}

export type DeprecatedMintPrintingTokensInput<
  TAccountDestination extends string = string,
  TAccountPrintingMint extends string = string,
  TAccountUpdateAuthority extends string = string,
  TAccountMetadata extends string = string,
  TAccountMasterEdition extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountRent extends string = string,
> = {
  /** Destination account */
  destination: Address<TAccountDestination>;
  /** Printing mint */
  printingMint: Address<TAccountPrintingMint>;
  /** Update authority */
  updateAuthority: TransactionSigner<TAccountUpdateAuthority>;
  /** Metadata key (pda of ['metadata', program id, mint id]) */
  metadata: Address<TAccountMetadata>;
  /** Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition']) */
  masterEdition: Address<TAccountMasterEdition>;
  /** Token program */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** Rent */
  rent?: Address<TAccountRent>;
  mintPrintingTokensViaTokenArgs: DeprecatedMintPrintingTokensInstructionDataArgs['mintPrintingTokensViaTokenArgs'];
};

export function getDeprecatedMintPrintingTokensInstruction<
  TAccountDestination extends string,
  TAccountPrintingMint extends string,
  TAccountUpdateAuthority extends string,
  TAccountMetadata extends string,
  TAccountMasterEdition extends string,
  TAccountTokenProgram extends string,
  TAccountRent extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: DeprecatedMintPrintingTokensInput<
    TAccountDestination,
    TAccountPrintingMint,
    TAccountUpdateAuthority,
    TAccountMetadata,
    TAccountMasterEdition,
    TAccountTokenProgram,
    TAccountRent
  >,
  config?: { programAddress?: TProgramAddress }
): DeprecatedMintPrintingTokensInstruction<
  TProgramAddress,
  TAccountDestination,
  TAccountPrintingMint,
  TAccountUpdateAuthority,
  TAccountMetadata,
  TAccountMasterEdition,
  TAccountTokenProgram,
  TAccountRent
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    destination: { value: input.destination ?? null, isWritable: true },
    printingMint: { value: input.printingMint ?? null, isWritable: true },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
    },
    metadata: { value: input.metadata ?? null, isWritable: false },
    masterEdition: { value: input.masterEdition ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    rent: { value: input.rent ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.rent.value) {
    accounts.rent.value =
      'SysvarRent111111111111111111111111111111111' as Address<'SysvarRent111111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.destination),
      getAccountMeta(accounts.printingMint),
      getAccountMeta(accounts.updateAuthority),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.rent),
    ],
    programAddress,
    data: getDeprecatedMintPrintingTokensInstructionDataEncoder().encode(
      args as DeprecatedMintPrintingTokensInstructionDataArgs
    ),
  } as DeprecatedMintPrintingTokensInstruction<
    TProgramAddress,
    TAccountDestination,
    TAccountPrintingMint,
    TAccountUpdateAuthority,
    TAccountMetadata,
    TAccountMasterEdition,
    TAccountTokenProgram,
    TAccountRent
  >;

  return instruction;
}

export type ParsedDeprecatedMintPrintingTokensInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Destination account */
    destination: TAccountMetas[0];
    /** Printing mint */
    printingMint: TAccountMetas[1];
    /** Update authority */
    updateAuthority: TAccountMetas[2];
    /** Metadata key (pda of ['metadata', program id, mint id]) */
    metadata: TAccountMetas[3];
    /** Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition']) */
    masterEdition: TAccountMetas[4];
    /** Token program */
    tokenProgram: TAccountMetas[5];
    /** Rent */
    rent: TAccountMetas[6];
  };
  data: DeprecatedMintPrintingTokensInstructionData;
};

export function parseDeprecatedMintPrintingTokensInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedDeprecatedMintPrintingTokensInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
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
      destination: getNextAccount(),
      printingMint: getNextAccount(),
      updateAuthority: getNextAccount(),
      metadata: getNextAccount(),
      masterEdition: getNextAccount(),
      tokenProgram: getNextAccount(),
      rent: getNextAccount(),
    },
    data: getDeprecatedMintPrintingTokensInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
