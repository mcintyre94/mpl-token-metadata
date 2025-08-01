#![cfg(feature = "test-bpf")]
pub mod utils;

use solana_program_test::*;
use solana_sdk::{
    instruction::InstructionError,
    signature::{Keypair, Signer},
    transaction::TransactionError,
};
use utils::*;

mod revoke {

    use borsh::BorshDeserialize;
    use num_traits::FromPrimitive;
    use solana_program::{program_option::COption, pubkey::Pubkey};
    use solana_sdk::account::{Account as SdkAccount, AccountSharedData};
    use spl_token_2022::state::Account;
    use token_metadata::{
        error::MetadataError,
        instruction::{DelegateArgs, MetadataDelegateRole, RevokeArgs},
        pda::{find_metadata_delegate_record_account, find_token_record_account},
        state::{
            Key, Metadata, MetadataDelegateRecord, TokenDelegateRole, TokenRecord, TokenStandard,
            TOKEN_RECORD_SIZE,
        },
        utils::unpack,
    };

    use super::*;

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn revoke_transfer_delegate_programmable_nonfungible(spl_token_program: Pubkey) {
        let mut context = program_test().start_with_context().await;

        // asset

        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                None,
                None,
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        // delegates the asset for sale

        let user = Keypair::new();
        let user_pubkey = user.pubkey();
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .delegate(
                &mut context,
                payer,
                user_pubkey,
                DelegateArgs::TransferV1 {
                    amount: 1,
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        let (pda_key, _) = find_token_record_account(&asset.mint.pubkey(), &asset.token.unwrap());

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, Some(user_pubkey));
        assert_eq!(
            token_record.delegate_role,
            Some(TokenDelegateRole::Transfer)
        );

        // revokes the delegate
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let approver = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .revoke(
                &mut context,
                payer,
                approver,
                user_pubkey,
                RevokeArgs::TransferV1,
                spl_token_program,
            )
            .await
            .unwrap();

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, None);

        if let Some(token) = asset.token {
            let account = get_account(&mut context, &token).await;
            let token_account = unpack::<Account>(&account.data).unwrap();

            assert!(token_account.is_frozen());
            assert_eq!(token_account.delegate, COption::None);
        } else {
            panic!("Missing token account");
        }
    }

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn revoke_collection_delegate_programmable_nonfungible(spl_token_program: Pubkey) {
        let mut context = program_test().start_with_context().await;

        // asset

        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                None,
                None,
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        let metadata_account = get_account(&mut context, &asset.metadata).await;
        let metadata: Metadata = Metadata::deserialize(&mut &metadata_account.data[..]).unwrap();
        assert_eq!(metadata.update_authority, context.payer.pubkey());

        // creates a collection delegate

        let user = Keypair::new();
        let user_pubkey = user.pubkey();
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let payer_pubkey = payer.pubkey();

        asset
            .delegate(
                &mut context,
                payer,
                user_pubkey,
                DelegateArgs::CollectionV1 {
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        // checks that the delegate exists
        let (pda_key, _) = find_metadata_delegate_record_account(
            &asset.mint.pubkey(),
            MetadataDelegateRole::Collection,
            &payer_pubkey,
            &user_pubkey,
        );

        let pda = get_account(&mut context, &pda_key).await;
        let delegate_record = MetadataDelegateRecord::from_bytes(&pda.data).unwrap();
        assert_eq!(delegate_record.key, Key::MetadataDelegate);

        // revokes the delegate
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let approver = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .revoke(
                &mut context,
                payer,
                approver,
                user_pubkey,
                RevokeArgs::CollectionV1,
                spl_token_program,
            )
            .await
            .unwrap();

        // checks that the delagate exists (it should not exist)

        assert!(context
            .banks_client
            .get_account(pda_key)
            .await
            .unwrap()
            .is_none());
    }

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn revoke_sale_delegate_programmable_nonfungible(spl_token_program: Pubkey) {
        let mut context = program_test().start_with_context().await;

        // asset

        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                None,
                None,
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        // delegates the asset for sale
        let user = Keypair::new();
        let user_pubkey = user.pubkey();
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .delegate(
                &mut context,
                payer,
                user_pubkey,
                DelegateArgs::SaleV1 {
                    amount: 1,
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        // checks that the delagate exists

        let (pda_key, _) = find_token_record_account(&asset.mint.pubkey(), &asset.token.unwrap());

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, Some(user_pubkey));

        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let approver = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        // revokes the delegate
        asset
            .revoke(
                &mut context,
                payer,
                approver,
                user_pubkey,
                RevokeArgs::SaleV1,
                spl_token_program,
            )
            .await
            .unwrap();

        // asserts

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, None);

        if let Some(token) = asset.token {
            let account = get_account(&mut context, &token).await;
            let token_account = unpack::<Account>(&account.data).unwrap();

            assert!(token_account.is_frozen());
            assert_eq!(token_account.delegate, COption::None);
        } else {
            panic!("Missing token account");
        }
    }

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn revoke_sale_delegate_as_transfer_delegate(spl_token_program: Pubkey) {
        let mut context = program_test().start_with_context().await;

        // asset
        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                None,
                None,
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        // delegates the asset for sale
        let user = Keypair::new();
        let user_pubkey = user.pubkey();
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .delegate(
                &mut context,
                payer,
                user_pubkey,
                DelegateArgs::SaleV1 {
                    amount: 1,
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        // checks that the delagate exists

        let (pda_key, _) = find_token_record_account(&asset.mint.pubkey(), &asset.token.unwrap());

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, Some(user_pubkey));

        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let approver = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        // revokes the delegate
        let error = asset
            .revoke(
                &mut context,
                payer,
                approver,
                user_pubkey,
                RevokeArgs::TransferV1,
                spl_token_program,
            )
            .await
            .unwrap_err();

        // assert

        assert_custom_error!(error, MetadataError::InvalidDelegate);
    }

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn clear_rule_set_revision_on_delegate(spl_token_program: Pubkey) {
        let mut program_test = program_test();
        program_test.add_program("mpl_token_auth_rules", mpl_token_auth_rules::ID, None);
        program_test.set_compute_max_units(400_000);
        let mut context = program_test.start_with_context().await;

        // creates the auth rule set

        let payer = context.payer.dirty_clone();
        let (rule_set, auth_data) =
            create_default_metaplex_rule_set(&mut context, payer, false).await;

        // asset

        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                Some(rule_set),
                Some(auth_data),
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        // asserts

        let (pda_key, _) = find_token_record_account(&asset.mint.pubkey(), &asset.token.unwrap());
        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.rule_set_revision, None);

        // delegates the asset for transfer

        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .delegate(
                &mut context,
                payer,
                rule_set,
                DelegateArgs::SaleV1 {
                    amount: 1,
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        // asserts

        let (pda_key, _) = find_token_record_account(&asset.mint.pubkey(), &asset.token.unwrap());

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.key, Key::TokenRecord);
        assert_eq!(token_record.delegate, Some(rule_set));
        assert_eq!(token_record.delegate_role, Some(TokenDelegateRole::Sale));
        assert_eq!(token_record.rule_set_revision, Some(0));

        // revokes the delegate

        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let authority = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .revoke(
                &mut context,
                payer,
                authority,
                rule_set,
                RevokeArgs::SaleV1,
                spl_token_program,
            )
            .await
            .unwrap();

        // asserts

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();
        // the revision must have been cleared
        assert_eq!(token_record.rule_set_revision, None);
    }

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn revoke_migration_delegate_programmable_nonfungible(spl_token_program: Pubkey) {
        let mut context = program_test().start_with_context().await;

        // asset

        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                None,
                None,
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        // delegates the asset for sale

        let user = Keypair::new();
        let user_pubkey = user.pubkey();
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .delegate(
                &mut context,
                payer,
                user_pubkey,
                DelegateArgs::TransferV1 {
                    amount: 1,
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        let (pda_key, _) = find_token_record_account(&asset.mint.pubkey(), &asset.token.unwrap());

        let pda = get_account(&mut context, &pda_key).await;
        let mut token_record: TokenRecord =
            BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, Some(user_pubkey));
        assert_eq!(
            token_record.delegate_role,
            Some(TokenDelegateRole::Transfer)
        );

        // inject the token delegate role to 'Migration' since we cannot create
        // one through the API
        token_record.delegate_role = Some(TokenDelegateRole::Migration);
        let mut data = vec![0u8; TOKEN_RECORD_SIZE];
        borsh::to_writer(&mut data[..TOKEN_RECORD_SIZE], &token_record).unwrap();

        let record_account = SdkAccount {
            lamports: pda.lamports,
            data,
            owner: token_metadata::ID,
            executable: false,
            rent_epoch: pda.rent_epoch,
        };
        let record_account_shared_data: AccountSharedData = record_account.into();
        context.set_account(&pda_key, &record_account_shared_data);

        // revokes the delegate
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let approver = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .revoke(
                &mut context,
                payer,
                approver,
                user_pubkey,
                RevokeArgs::MigrationV1,
                spl_token_program,
            )
            .await
            .unwrap();

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, None);

        if let Some(token) = asset.token {
            let account = get_account(&mut context, &token).await;
            let token_account = unpack::<Account>(&account.data).unwrap();

            assert!(token_account.is_frozen());
            assert_eq!(token_account.delegate, COption::None);
        } else {
            panic!("Missing token account");
        }
    }

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn revoke_utility_delegate_programmable_nonfungible(spl_token_program: Pubkey) {
        let mut context = program_test().start_with_context().await;

        // asset

        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                None,
                None,
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        let user = Keypair::new();
        let user_pubkey = user.pubkey();
        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .delegate(
                &mut context,
                payer,
                user_pubkey,
                DelegateArgs::UtilityV1 {
                    amount: 1,
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        // checks that the delegate exists

        let (pda_key, _) = find_token_record_account(&asset.mint.pubkey(), &asset.token.unwrap());

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, Some(user_pubkey));

        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();
        let approver = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        // revokes the delegate
        asset
            .revoke(
                &mut context,
                payer,
                approver,
                user_pubkey,
                RevokeArgs::UtilityV1,
                spl_token_program,
            )
            .await
            .unwrap();

        // asserts

        let pda = get_account(&mut context, &pda_key).await;
        let token_record: TokenRecord = BorshDeserialize::deserialize(&mut &pda.data[..]).unwrap();

        assert_eq!(token_record.delegate, None);

        if let Some(token) = asset.token {
            let account = get_account(&mut context, &token).await;
            let token_account = unpack::<Account>(&account.data).unwrap();

            assert!(token_account.is_frozen());
            assert!(token_account.delegate.is_none());
            assert!(token_account.close_authority.is_none());
        } else {
            panic!("Missing token account");
        }
    }

    #[test_case::test_case(spl_token::id() ; "Token Program")]
    #[test_case::test_case(spl_token_2022::id() ; "Token-2022 Program")]
    #[tokio::test]
    async fn invalid_close_authority_fails(spl_token_program: Pubkey) {
        let mut context = program_test().start_with_context().await;

        // asset

        let mut asset = DigitalAsset::default();
        asset
            .create_and_mint(
                &mut context,
                TokenStandard::ProgrammableNonFungible,
                None,
                None,
                1,
                spl_token_program,
            )
            .await
            .unwrap();

        assert!(asset.token.is_some());

        let delegate = Keypair::new();
        let delegate_pubkey = delegate.pubkey();

        let payer = Keypair::from_bytes(&context.payer.to_bytes()).unwrap();

        asset
            .delegate(
                &mut context,
                payer,
                delegate_pubkey,
                DelegateArgs::UtilityV1 {
                    amount: 1,
                    authorization_data: None,
                },
                spl_token_program,
            )
            .await
            .unwrap();

        // To simulate the state where the close authority is set to the delegate instead of
        // the asset's master edition account, we need to inject modified token account state.
        asset
            .inject_close_authority(&mut context, &delegate_pubkey)
            .await;

        let payer = context.payer.dirty_clone();
        let approver = context.payer.dirty_clone();

        // Now we call revoke, expecting to get an error since neither the owner nor Token Metadata
        // have the authority to clear the close authority.
        // revokes the delegate
        let err = asset
            .revoke(
                &mut context,
                payer,
                approver,
                delegate_pubkey,
                RevokeArgs::UtilityV1,
                spl_token_program,
            )
            .await
            .unwrap_err();

        assert_custom_error!(err, MetadataError::InvalidCloseAuthority);
    }
}
