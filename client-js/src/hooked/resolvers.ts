import { isTransactionSigner, ResolvedAccount } from "../generated/shared";
import { TokenStandardArgs } from "../generated";
import { isNonFungible } from "../digitalAsset";

export function resolveIsNonFungibleOrIsMintSigner({
  accounts,
  args,
}: {
  accounts: { mint: ResolvedAccount };
  args: { tokenStandard?: TokenStandardArgs };
}): boolean {
  return (
    (args.tokenStandard && isNonFungible(args.tokenStandard)) ||
    (accounts.mint.value && isTransactionSigner(accounts.mint.value)) ||
    false
  );
}

export function resolveIsNonFungible({
  args,
}: {
  args: { tokenStandard?: TokenStandardArgs };
}): boolean {
  return (args.tokenStandard && isNonFungible(args.tokenStandard)) || false;
}

export function resolveOptionalTokenOwner({
  accounts,
}: {
  accounts: {
    token: ResolvedAccount;
    authority: ResolvedAccount;
  };
}): Pick<ResolvedAccount, "value"> {
  if (accounts.token.value)
    return {
      value: null,
    };

  return {
    value: accounts.authority.value,
  };
}
