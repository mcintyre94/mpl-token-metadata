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
import { MPL_TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const BURN_EDITION_NFT_DISCRIMINATOR = 37;

export function getBurnEditionNftDiscriminatorBytes() {
  return getU8Encoder().encode(BURN_EDITION_NFT_DISCRIMINATOR);
}

export type BurnEditionNftInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata extends string | AccountMeta<string> = string,
  TAccountOwner extends string | AccountMeta<string> = string,
  TAccountPrintEditionMint extends string | AccountMeta<string> = string,
  TAccountMasterEditionMint extends string | AccountMeta<string> = string,
  TAccountPrintEditionTokenAccount extends
    | string
    | AccountMeta<string> = string,
  TAccountMasterEditionTokenAccount extends
    | string
    | AccountMeta<string> = string,
  TAccountMasterEditionAccount extends string | AccountMeta<string> = string,
  TAccountPrintEditionAccount extends string | AccountMeta<string> = string,
  TAccountEditionMarkerAccount extends string | AccountMeta<string> = string,
  TAccountSplTokenProgram extends
    | string
    | AccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountOwner extends string
        ? WritableSignerAccount<TAccountOwner> &
            AccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountPrintEditionMint extends string
        ? WritableAccount<TAccountPrintEditionMint>
        : TAccountPrintEditionMint,
      TAccountMasterEditionMint extends string
        ? ReadonlyAccount<TAccountMasterEditionMint>
        : TAccountMasterEditionMint,
      TAccountPrintEditionTokenAccount extends string
        ? WritableAccount<TAccountPrintEditionTokenAccount>
        : TAccountPrintEditionTokenAccount,
      TAccountMasterEditionTokenAccount extends string
        ? ReadonlyAccount<TAccountMasterEditionTokenAccount>
        : TAccountMasterEditionTokenAccount,
      TAccountMasterEditionAccount extends string
        ? WritableAccount<TAccountMasterEditionAccount>
        : TAccountMasterEditionAccount,
      TAccountPrintEditionAccount extends string
        ? WritableAccount<TAccountPrintEditionAccount>
        : TAccountPrintEditionAccount,
      TAccountEditionMarkerAccount extends string
        ? WritableAccount<TAccountEditionMarkerAccount>
        : TAccountEditionMarkerAccount,
      TAccountSplTokenProgram extends string
        ? ReadonlyAccount<TAccountSplTokenProgram>
        : TAccountSplTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type BurnEditionNftInstructionData = { discriminator: number };

export type BurnEditionNftInstructionDataArgs = {};

export function getBurnEditionNftInstructionDataEncoder(): FixedSizeEncoder<BurnEditionNftInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: BURN_EDITION_NFT_DISCRIMINATOR })
  );
}

export function getBurnEditionNftInstructionDataDecoder(): FixedSizeDecoder<BurnEditionNftInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getBurnEditionNftInstructionDataCodec(): FixedSizeCodec<
  BurnEditionNftInstructionDataArgs,
  BurnEditionNftInstructionData
> {
  return combineCodec(
    getBurnEditionNftInstructionDataEncoder(),
    getBurnEditionNftInstructionDataDecoder()
  );
}

export type BurnEditionNftInput<
  TAccountMetadata extends string = string,
  TAccountOwner extends string = string,
  TAccountPrintEditionMint extends string = string,
  TAccountMasterEditionMint extends string = string,
  TAccountPrintEditionTokenAccount extends string = string,
  TAccountMasterEditionTokenAccount extends string = string,
  TAccountMasterEditionAccount extends string = string,
  TAccountPrintEditionAccount extends string = string,
  TAccountEditionMarkerAccount extends string = string,
  TAccountSplTokenProgram extends string = string,
> = {
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata: Address<TAccountMetadata>;
  /** NFT owner */
  owner: TransactionSigner<TAccountOwner>;
  /** Mint of the print edition NFT */
  printEditionMint: Address<TAccountPrintEditionMint>;
  /** Mint of the original/master NFT */
  masterEditionMint: Address<TAccountMasterEditionMint>;
  /** Token account the print edition NFT is in */
  printEditionTokenAccount: Address<TAccountPrintEditionTokenAccount>;
  /** Token account the Master Edition NFT is in */
  masterEditionTokenAccount: Address<TAccountMasterEditionTokenAccount>;
  /** MasterEdition2 of the original NFT */
  masterEditionAccount: Address<TAccountMasterEditionAccount>;
  /** Print Edition account of the NFT */
  printEditionAccount: Address<TAccountPrintEditionAccount>;
  /** Edition Marker PDA of the NFT */
  editionMarkerAccount: Address<TAccountEditionMarkerAccount>;
  /** SPL Token Program */
  splTokenProgram?: Address<TAccountSplTokenProgram>;
};

export function getBurnEditionNftInstruction<
  TAccountMetadata extends string,
  TAccountOwner extends string,
  TAccountPrintEditionMint extends string,
  TAccountMasterEditionMint extends string,
  TAccountPrintEditionTokenAccount extends string,
  TAccountMasterEditionTokenAccount extends string,
  TAccountMasterEditionAccount extends string,
  TAccountPrintEditionAccount extends string,
  TAccountEditionMarkerAccount extends string,
  TAccountSplTokenProgram extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: BurnEditionNftInput<
    TAccountMetadata,
    TAccountOwner,
    TAccountPrintEditionMint,
    TAccountMasterEditionMint,
    TAccountPrintEditionTokenAccount,
    TAccountMasterEditionTokenAccount,
    TAccountMasterEditionAccount,
    TAccountPrintEditionAccount,
    TAccountEditionMarkerAccount,
    TAccountSplTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): BurnEditionNftInstruction<
  TProgramAddress,
  TAccountMetadata,
  TAccountOwner,
  TAccountPrintEditionMint,
  TAccountMasterEditionMint,
  TAccountPrintEditionTokenAccount,
  TAccountMasterEditionTokenAccount,
  TAccountMasterEditionAccount,
  TAccountPrintEditionAccount,
  TAccountEditionMarkerAccount,
  TAccountSplTokenProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: true },
    printEditionMint: {
      value: input.printEditionMint ?? null,
      isWritable: true,
    },
    masterEditionMint: {
      value: input.masterEditionMint ?? null,
      isWritable: false,
    },
    printEditionTokenAccount: {
      value: input.printEditionTokenAccount ?? null,
      isWritable: true,
    },
    masterEditionTokenAccount: {
      value: input.masterEditionTokenAccount ?? null,
      isWritable: false,
    },
    masterEditionAccount: {
      value: input.masterEditionAccount ?? null,
      isWritable: true,
    },
    printEditionAccount: {
      value: input.printEditionAccount ?? null,
      isWritable: true,
    },
    editionMarkerAccount: {
      value: input.editionMarkerAccount ?? null,
      isWritable: true,
    },
    splTokenProgram: {
      value: input.splTokenProgram ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.splTokenProgram.value) {
    accounts.splTokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.printEditionMint),
      getAccountMeta(accounts.masterEditionMint),
      getAccountMeta(accounts.printEditionTokenAccount),
      getAccountMeta(accounts.masterEditionTokenAccount),
      getAccountMeta(accounts.masterEditionAccount),
      getAccountMeta(accounts.printEditionAccount),
      getAccountMeta(accounts.editionMarkerAccount),
      getAccountMeta(accounts.splTokenProgram),
    ],
    programAddress,
    data: getBurnEditionNftInstructionDataEncoder().encode({}),
  } as BurnEditionNftInstruction<
    TProgramAddress,
    TAccountMetadata,
    TAccountOwner,
    TAccountPrintEditionMint,
    TAccountMasterEditionMint,
    TAccountPrintEditionTokenAccount,
    TAccountMasterEditionTokenAccount,
    TAccountMasterEditionAccount,
    TAccountPrintEditionAccount,
    TAccountEditionMarkerAccount,
    TAccountSplTokenProgram
  >;

  return instruction;
}

export type ParsedBurnEditionNftInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Metadata (pda of ['metadata', program id, mint id]) */
    metadata: TAccountMetas[0];
    /** NFT owner */
    owner: TAccountMetas[1];
    /** Mint of the print edition NFT */
    printEditionMint: TAccountMetas[2];
    /** Mint of the original/master NFT */
    masterEditionMint: TAccountMetas[3];
    /** Token account the print edition NFT is in */
    printEditionTokenAccount: TAccountMetas[4];
    /** Token account the Master Edition NFT is in */
    masterEditionTokenAccount: TAccountMetas[5];
    /** MasterEdition2 of the original NFT */
    masterEditionAccount: TAccountMetas[6];
    /** Print Edition account of the NFT */
    printEditionAccount: TAccountMetas[7];
    /** Edition Marker PDA of the NFT */
    editionMarkerAccount: TAccountMetas[8];
    /** SPL Token Program */
    splTokenProgram: TAccountMetas[9];
  };
  data: BurnEditionNftInstructionData;
};

export function parseBurnEditionNftInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedBurnEditionNftInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 10) {
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
      printEditionMint: getNextAccount(),
      masterEditionMint: getNextAccount(),
      printEditionTokenAccount: getNextAccount(),
      masterEditionTokenAccount: getNextAccount(),
      masterEditionAccount: getNextAccount(),
      printEditionAccount: getNextAccount(),
      editionMarkerAccount: getNextAccount(),
      splTokenProgram: getNextAccount(),
    },
    data: getBurnEditionNftInstructionDataDecoder().decode(instruction.data),
  };
}
