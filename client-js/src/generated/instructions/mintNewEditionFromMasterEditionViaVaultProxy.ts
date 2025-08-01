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
  type WritableSignerAccount,
} from '@solana/kit';
import { MPL_TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getMintNewEditionFromMasterEditionViaTokenArgsDecoder,
  getMintNewEditionFromMasterEditionViaTokenArgsEncoder,
  type MintNewEditionFromMasterEditionViaTokenArgs,
  type MintNewEditionFromMasterEditionViaTokenArgsArgs,
} from '../types';

export const MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_VAULT_PROXY_DISCRIMINATOR = 13;

export function getMintNewEditionFromMasterEditionViaVaultProxyDiscriminatorBytes() {
  return getU8Encoder().encode(
    MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_VAULT_PROXY_DISCRIMINATOR
  );
}

export type MintNewEditionFromMasterEditionViaVaultProxyInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountNewMetadata extends string | AccountMeta<string> = string,
  TAccountNewEdition extends string | AccountMeta<string> = string,
  TAccountMasterEdition extends string | AccountMeta<string> = string,
  TAccountNewMint extends string | AccountMeta<string> = string,
  TAccountEditionMarkPda extends string | AccountMeta<string> = string,
  TAccountNewMintAuthority extends string | AccountMeta<string> = string,
  TAccountPayer extends string | AccountMeta<string> = string,
  TAccountVaultAuthority extends string | AccountMeta<string> = string,
  TAccountSafetyDepositStore extends string | AccountMeta<string> = string,
  TAccountSafetyDepositBox extends string | AccountMeta<string> = string,
  TAccountVault extends string | AccountMeta<string> = string,
  TAccountNewMetadataUpdateAuthority extends
    | string
    | AccountMeta<string> = string,
  TAccountMetadata extends string | AccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | AccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountTokenVaultProgram extends string | AccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | AccountMeta<string> = '11111111111111111111111111111111',
  TAccountRent extends string | AccountMeta<string> | undefined = undefined,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountNewMetadata extends string
        ? WritableAccount<TAccountNewMetadata>
        : TAccountNewMetadata,
      TAccountNewEdition extends string
        ? WritableAccount<TAccountNewEdition>
        : TAccountNewEdition,
      TAccountMasterEdition extends string
        ? WritableAccount<TAccountMasterEdition>
        : TAccountMasterEdition,
      TAccountNewMint extends string
        ? WritableAccount<TAccountNewMint>
        : TAccountNewMint,
      TAccountEditionMarkPda extends string
        ? WritableAccount<TAccountEditionMarkPda>
        : TAccountEditionMarkPda,
      TAccountNewMintAuthority extends string
        ? ReadonlySignerAccount<TAccountNewMintAuthority> &
            AccountSignerMeta<TAccountNewMintAuthority>
        : TAccountNewMintAuthority,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            AccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountVaultAuthority extends string
        ? ReadonlySignerAccount<TAccountVaultAuthority> &
            AccountSignerMeta<TAccountVaultAuthority>
        : TAccountVaultAuthority,
      TAccountSafetyDepositStore extends string
        ? ReadonlyAccount<TAccountSafetyDepositStore>
        : TAccountSafetyDepositStore,
      TAccountSafetyDepositBox extends string
        ? ReadonlyAccount<TAccountSafetyDepositBox>
        : TAccountSafetyDepositBox,
      TAccountVault extends string
        ? ReadonlyAccount<TAccountVault>
        : TAccountVault,
      TAccountNewMetadataUpdateAuthority extends string
        ? ReadonlyAccount<TAccountNewMetadataUpdateAuthority>
        : TAccountNewMetadataUpdateAuthority,
      TAccountMetadata extends string
        ? ReadonlyAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountTokenVaultProgram extends string
        ? ReadonlyAccount<TAccountTokenVaultProgram>
        : TAccountTokenVaultProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...(TAccountRent extends undefined
        ? []
        : [
            TAccountRent extends string
              ? ReadonlyAccount<TAccountRent>
              : TAccountRent,
          ]),
      ...TRemainingAccounts,
    ]
  >;

export type MintNewEditionFromMasterEditionViaVaultProxyInstructionData = {
  discriminator: number;
  mintNewEditionFromMasterEditionViaTokenArgs: MintNewEditionFromMasterEditionViaTokenArgs;
};

export type MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs = {
  mintNewEditionFromMasterEditionViaTokenArgs: MintNewEditionFromMasterEditionViaTokenArgsArgs;
};

export function getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataEncoder(): FixedSizeEncoder<MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      [
        'mintNewEditionFromMasterEditionViaTokenArgs',
        getMintNewEditionFromMasterEditionViaTokenArgsEncoder(),
      ],
    ]),
    (value) => ({
      ...value,
      discriminator:
        MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_VAULT_PROXY_DISCRIMINATOR,
    })
  );
}

export function getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataDecoder(): FixedSizeDecoder<MintNewEditionFromMasterEditionViaVaultProxyInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    [
      'mintNewEditionFromMasterEditionViaTokenArgs',
      getMintNewEditionFromMasterEditionViaTokenArgsDecoder(),
    ],
  ]);
}

export function getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataCodec(): FixedSizeCodec<
  MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs,
  MintNewEditionFromMasterEditionViaVaultProxyInstructionData
> {
  return combineCodec(
    getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataEncoder(),
    getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataDecoder()
  );
}

export type MintNewEditionFromMasterEditionViaVaultProxyInput<
  TAccountNewMetadata extends string = string,
  TAccountNewEdition extends string = string,
  TAccountMasterEdition extends string = string,
  TAccountNewMint extends string = string,
  TAccountEditionMarkPda extends string = string,
  TAccountNewMintAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountVaultAuthority extends string = string,
  TAccountSafetyDepositStore extends string = string,
  TAccountSafetyDepositBox extends string = string,
  TAccountVault extends string = string,
  TAccountNewMetadataUpdateAuthority extends string = string,
  TAccountMetadata extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountTokenVaultProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountRent extends string = string,
> = {
  /** New Metadata key (pda of ['metadata', program id, mint id]) */
  newMetadata: Address<TAccountNewMetadata>;
  /** New Edition (pda of ['metadata', program id, mint id, 'edition']) */
  newEdition: Address<TAccountNewEdition>;
  /** Master Record Edition V2 (pda of ['metadata', program id, master metadata mint id, 'edition'] */
  masterEdition: Address<TAccountMasterEdition>;
  /** Mint of new token - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
  newMint: Address<TAccountNewMint>;
  /** Edition pda to mark creation - will be checked for pre-existence. (pda of ['metadata', program id, master metadata mint id, 'edition', edition_number]) where edition_number is NOT the edition number you pass in args but actually edition_number = floor(edition/EDITION_MARKER_BIT_SIZE). */
  editionMarkPda: Address<TAccountEditionMarkPda>;
  /** Mint authority of new mint */
  newMintAuthority: TransactionSigner<TAccountNewMintAuthority>;
  /** payer */
  payer: TransactionSigner<TAccountPayer>;
  /** Vault authority */
  vaultAuthority: TransactionSigner<TAccountVaultAuthority>;
  /** Safety deposit token store account */
  safetyDepositStore: Address<TAccountSafetyDepositStore>;
  /** Safety deposit box */
  safetyDepositBox: Address<TAccountSafetyDepositBox>;
  /** Vault */
  vault: Address<TAccountVault>;
  /** Update authority info for new metadata */
  newMetadataUpdateAuthority: Address<TAccountNewMetadataUpdateAuthority>;
  /** Master record metadata account */
  metadata: Address<TAccountMetadata>;
  /** Token program */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** Token vault program */
  tokenVaultProgram: Address<TAccountTokenVaultProgram>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Rent info */
  rent?: Address<TAccountRent>;
  mintNewEditionFromMasterEditionViaTokenArgs: MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs['mintNewEditionFromMasterEditionViaTokenArgs'];
};

export function getMintNewEditionFromMasterEditionViaVaultProxyInstruction<
  TAccountNewMetadata extends string,
  TAccountNewEdition extends string,
  TAccountMasterEdition extends string,
  TAccountNewMint extends string,
  TAccountEditionMarkPda extends string,
  TAccountNewMintAuthority extends string,
  TAccountPayer extends string,
  TAccountVaultAuthority extends string,
  TAccountSafetyDepositStore extends string,
  TAccountSafetyDepositBox extends string,
  TAccountVault extends string,
  TAccountNewMetadataUpdateAuthority extends string,
  TAccountMetadata extends string,
  TAccountTokenProgram extends string,
  TAccountTokenVaultProgram extends string,
  TAccountSystemProgram extends string,
  TAccountRent extends string,
  TProgramAddress extends Address = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: MintNewEditionFromMasterEditionViaVaultProxyInput<
    TAccountNewMetadata,
    TAccountNewEdition,
    TAccountMasterEdition,
    TAccountNewMint,
    TAccountEditionMarkPda,
    TAccountNewMintAuthority,
    TAccountPayer,
    TAccountVaultAuthority,
    TAccountSafetyDepositStore,
    TAccountSafetyDepositBox,
    TAccountVault,
    TAccountNewMetadataUpdateAuthority,
    TAccountMetadata,
    TAccountTokenProgram,
    TAccountTokenVaultProgram,
    TAccountSystemProgram,
    TAccountRent
  >,
  config?: { programAddress?: TProgramAddress }
): MintNewEditionFromMasterEditionViaVaultProxyInstruction<
  TProgramAddress,
  TAccountNewMetadata,
  TAccountNewEdition,
  TAccountMasterEdition,
  TAccountNewMint,
  TAccountEditionMarkPda,
  TAccountNewMintAuthority,
  TAccountPayer,
  TAccountVaultAuthority,
  TAccountSafetyDepositStore,
  TAccountSafetyDepositBox,
  TAccountVault,
  TAccountNewMetadataUpdateAuthority,
  TAccountMetadata,
  TAccountTokenProgram,
  TAccountTokenVaultProgram,
  TAccountSystemProgram,
  TAccountRent
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    newMetadata: { value: input.newMetadata ?? null, isWritable: true },
    newEdition: { value: input.newEdition ?? null, isWritable: true },
    masterEdition: { value: input.masterEdition ?? null, isWritable: true },
    newMint: { value: input.newMint ?? null, isWritable: true },
    editionMarkPda: { value: input.editionMarkPda ?? null, isWritable: true },
    newMintAuthority: {
      value: input.newMintAuthority ?? null,
      isWritable: false,
    },
    payer: { value: input.payer ?? null, isWritable: true },
    vaultAuthority: { value: input.vaultAuthority ?? null, isWritable: false },
    safetyDepositStore: {
      value: input.safetyDepositStore ?? null,
      isWritable: false,
    },
    safetyDepositBox: {
      value: input.safetyDepositBox ?? null,
      isWritable: false,
    },
    vault: { value: input.vault ?? null, isWritable: false },
    newMetadataUpdateAuthority: {
      value: input.newMetadataUpdateAuthority ?? null,
      isWritable: false,
    },
    metadata: { value: input.metadata ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    tokenVaultProgram: {
      value: input.tokenVaultProgram ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'omitted');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.newMetadata),
      getAccountMeta(accounts.newEdition),
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.newMint),
      getAccountMeta(accounts.editionMarkPda),
      getAccountMeta(accounts.newMintAuthority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.vaultAuthority),
      getAccountMeta(accounts.safetyDepositStore),
      getAccountMeta(accounts.safetyDepositBox),
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.newMetadataUpdateAuthority),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.tokenVaultProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.rent),
    ].filter(<T,>(x: T | undefined): x is T => x !== undefined),
    programAddress,
    data: getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataEncoder().encode(
      args as MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs
    ),
  } as MintNewEditionFromMasterEditionViaVaultProxyInstruction<
    TProgramAddress,
    TAccountNewMetadata,
    TAccountNewEdition,
    TAccountMasterEdition,
    TAccountNewMint,
    TAccountEditionMarkPda,
    TAccountNewMintAuthority,
    TAccountPayer,
    TAccountVaultAuthority,
    TAccountSafetyDepositStore,
    TAccountSafetyDepositBox,
    TAccountVault,
    TAccountNewMetadataUpdateAuthority,
    TAccountMetadata,
    TAccountTokenProgram,
    TAccountTokenVaultProgram,
    TAccountSystemProgram,
    TAccountRent
  >;

  return instruction;
}

export type ParsedMintNewEditionFromMasterEditionViaVaultProxyInstruction<
  TProgram extends string = typeof MPL_TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** New Metadata key (pda of ['metadata', program id, mint id]) */
    newMetadata: TAccountMetas[0];
    /** New Edition (pda of ['metadata', program id, mint id, 'edition']) */
    newEdition: TAccountMetas[1];
    /** Master Record Edition V2 (pda of ['metadata', program id, master metadata mint id, 'edition'] */
    masterEdition: TAccountMetas[2];
    /** Mint of new token - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
    newMint: TAccountMetas[3];
    /** Edition pda to mark creation - will be checked for pre-existence. (pda of ['metadata', program id, master metadata mint id, 'edition', edition_number]) where edition_number is NOT the edition number you pass in args but actually edition_number = floor(edition/EDITION_MARKER_BIT_SIZE). */
    editionMarkPda: TAccountMetas[4];
    /** Mint authority of new mint */
    newMintAuthority: TAccountMetas[5];
    /** payer */
    payer: TAccountMetas[6];
    /** Vault authority */
    vaultAuthority: TAccountMetas[7];
    /** Safety deposit token store account */
    safetyDepositStore: TAccountMetas[8];
    /** Safety deposit box */
    safetyDepositBox: TAccountMetas[9];
    /** Vault */
    vault: TAccountMetas[10];
    /** Update authority info for new metadata */
    newMetadataUpdateAuthority: TAccountMetas[11];
    /** Master record metadata account */
    metadata: TAccountMetas[12];
    /** Token program */
    tokenProgram: TAccountMetas[13];
    /** Token vault program */
    tokenVaultProgram: TAccountMetas[14];
    /** System program */
    systemProgram: TAccountMetas[15];
    /** Rent info */
    rent?: TAccountMetas[16] | undefined;
  };
  data: MintNewEditionFromMasterEditionViaVaultProxyInstructionData;
};

export function parseMintNewEditionFromMasterEditionViaVaultProxyInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedMintNewEditionFromMasterEditionViaVaultProxyInstruction<
  TProgram,
  TAccountMetas
> {
  if (instruction.accounts.length < 16) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  let optionalAccountsRemaining = instruction.accounts.length - 16;
  const getNextOptionalAccount = () => {
    if (optionalAccountsRemaining === 0) return undefined;
    optionalAccountsRemaining -= 1;
    return getNextAccount();
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      newMetadata: getNextAccount(),
      newEdition: getNextAccount(),
      masterEdition: getNextAccount(),
      newMint: getNextAccount(),
      editionMarkPda: getNextAccount(),
      newMintAuthority: getNextAccount(),
      payer: getNextAccount(),
      vaultAuthority: getNextAccount(),
      safetyDepositStore: getNextAccount(),
      safetyDepositBox: getNextAccount(),
      vault: getNextAccount(),
      newMetadataUpdateAuthority: getNextAccount(),
      metadata: getNextAccount(),
      tokenProgram: getNextAccount(),
      tokenVaultProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      rent: getNextOptionalAccount(),
    },
    data: getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
