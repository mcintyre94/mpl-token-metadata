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

export const UNVERIFY_CREATOR_V1_DISCRIMINATOR = 53;

export function getUnverifyCreatorV1DiscriminatorBytes() {
  return getU8Encoder().encode(UNVERIFY_CREATOR_V1_DISCRIMINATOR);
}

export type UnverifyCreatorV1Instruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountAuthority extends string | AccountMeta<string> = string,
  TAccountDelegateRecord extends string | AccountMeta<string> = string,
  TAccountMetadata extends string | AccountMeta<string> = string,
  TAccountCollectionMint extends string | AccountMeta<string> = string,
  TAccountCollectionMetadata extends string | AccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | AccountMeta<string> = '11111111111111111111111111111111',
  TAccountSysvarInstructions extends
    | string
    | AccountMeta<string> = 'Sysvar1nstructions1111111111111111111111111',
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            AccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountDelegateRecord extends string
        ? ReadonlyAccount<TAccountDelegateRecord>
        : TAccountDelegateRecord,
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountCollectionMint extends string
        ? ReadonlyAccount<TAccountCollectionMint>
        : TAccountCollectionMint,
      TAccountCollectionMetadata extends string
        ? WritableAccount<TAccountCollectionMetadata>
        : TAccountCollectionMetadata,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountSysvarInstructions extends string
        ? ReadonlyAccount<TAccountSysvarInstructions>
        : TAccountSysvarInstructions,
      ...TRemainingAccounts,
    ]
  >;

export type UnverifyCreatorV1InstructionData = {
  discriminator: number;
  unverifyCreatorV1Discriminator: number;
};

export type UnverifyCreatorV1InstructionDataArgs = {};

export function getUnverifyCreatorV1InstructionDataEncoder(): FixedSizeEncoder<UnverifyCreatorV1InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['unverifyCreatorV1Discriminator', getU8Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: UNVERIFY_CREATOR_V1_DISCRIMINATOR,
      unverifyCreatorV1Discriminator: 0,
    })
  );
}

export function getUnverifyCreatorV1InstructionDataDecoder(): FixedSizeDecoder<UnverifyCreatorV1InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['unverifyCreatorV1Discriminator', getU8Decoder()],
  ]);
}

export function getUnverifyCreatorV1InstructionDataCodec(): FixedSizeCodec<
  UnverifyCreatorV1InstructionDataArgs,
  UnverifyCreatorV1InstructionData
> {
  return combineCodec(
    getUnverifyCreatorV1InstructionDataEncoder(),
    getUnverifyCreatorV1InstructionDataDecoder()
  );
}

export type UnverifyCreatorV1Input<
  TAccountAuthority extends string = string,
  TAccountDelegateRecord extends string = string,
  TAccountMetadata extends string = string,
  TAccountCollectionMint extends string = string,
  TAccountCollectionMetadata extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSysvarInstructions extends string = string,
> = {
  /** Creator to verify, collection (or metadata if parent burned) update authority or delegate */
  authority: TransactionSigner<TAccountAuthority>;
  /** Delegate record PDA */
  delegateRecord?: Address<TAccountDelegateRecord>;
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
  /** Mint of the Collection */
  collectionMint?: Address<TAccountCollectionMint>;
  /** Metadata Account of the Collection */
  collectionMetadata?: Address<TAccountCollectionMetadata>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Instructions sysvar account */
  sysvarInstructions?: Address<TAccountSysvarInstructions>;
};

export function getUnverifyCreatorV1Instruction<
  TAccountAuthority extends string,
  TAccountDelegateRecord extends string,
  TAccountMetadata extends string,
  TAccountCollectionMint extends string,
  TAccountCollectionMetadata extends string,
  TAccountSystemProgram extends string,
  TAccountSysvarInstructions extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: UnverifyCreatorV1Input<
    TAccountAuthority,
    TAccountDelegateRecord,
    TAccountMetadata,
    TAccountCollectionMint,
    TAccountCollectionMetadata,
    TAccountSystemProgram,
    TAccountSysvarInstructions
  >,
  config?: { programAddress?: TProgramAddress }
): UnverifyCreatorV1Instruction<
  TProgramAddress,
  TAccountAuthority,
  TAccountDelegateRecord,
  TAccountMetadata,
  TAccountCollectionMint,
  TAccountCollectionMetadata,
  TAccountSystemProgram,
  TAccountSysvarInstructions
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: false },
    delegateRecord: { value: input.delegateRecord ?? null, isWritable: false },
    metadata: { value: input.metadata ?? null, isWritable: true },
    collectionMint: { value: input.collectionMint ?? null, isWritable: false },
    collectionMetadata: {
      value: input.collectionMetadata ?? null,
      isWritable: true,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    sysvarInstructions: {
      value: input.sysvarInstructions ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.sysvarInstructions.value) {
    accounts.sysvarInstructions.value =
      'Sysvar1nstructions1111111111111111111111111' as Address<'Sysvar1nstructions1111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.delegateRecord),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.collectionMint),
      getAccountMeta(accounts.collectionMetadata),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sysvarInstructions),
    ],
    programAddress,
    data: getUnverifyCreatorV1InstructionDataEncoder().encode({}),
  } as UnverifyCreatorV1Instruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountDelegateRecord,
    TAccountMetadata,
    TAccountCollectionMint,
    TAccountCollectionMetadata,
    TAccountSystemProgram,
    TAccountSysvarInstructions
  >;

  return instruction;
}

export type ParsedUnverifyCreatorV1Instruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Creator to verify, collection (or metadata if parent burned) update authority or delegate */
    authority: TAccountMetas[0];
    /** Delegate record PDA */
    delegateRecord?: TAccountMetas[1] | undefined;
    /** Metadata account */
    metadata: TAccountMetas[2];
    /** Mint of the Collection */
    collectionMint?: TAccountMetas[3] | undefined;
    /** Metadata Account of the Collection */
    collectionMetadata?: TAccountMetas[4] | undefined;
    /** System program */
    systemProgram: TAccountMetas[5];
    /** Instructions sysvar account */
    sysvarInstructions: TAccountMetas[6];
  };
  data: UnverifyCreatorV1InstructionData;
};

export function parseUnverifyCreatorV1Instruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedUnverifyCreatorV1Instruction<TProgram, TAccountMetas> {
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
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === MPL_TOKEN_METADATA_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      authority: getNextAccount(),
      delegateRecord: getNextOptionalAccount(),
      metadata: getNextAccount(),
      collectionMint: getNextOptionalAccount(),
      collectionMetadata: getNextOptionalAccount(),
      systemProgram: getNextAccount(),
      sysvarInstructions: getNextAccount(),
    },
    data: getUnverifyCreatorV1InstructionDataDecoder().decode(instruction.data),
  };
}
