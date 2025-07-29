import { HolderDelegateRole } from "../generated/types/holderDelegateRole";
import {
  combineCodec,
  getUtf8Decoder,
  getUtf8Encoder,
  transformDecoder,
  transformEncoder,
  VariableSizeCodec,
  VariableSizeDecoder,
  VariableSizeEncoder,
} from "@solana/kit";

export type HolderDelegateRoleSeed = "print_delegate";

export type HolderDelegateRoleSeedArgs =
  | HolderDelegateRoleSeed
  | HolderDelegateRole;

export function getHolderDelegateRoleSeedEncoder(): VariableSizeEncoder<HolderDelegateRoleSeedArgs> {
  return transformEncoder(
    getUtf8Encoder(),
    (args: HolderDelegateRoleSeedArgs): string => {
      if (typeof args === "string") return args;
      switch (args) {
        case HolderDelegateRole.PrintDelegate:
          return "print_delegate";
        default:
          // TODO: Coded error.
          throw new Error(`Invalid HolderDelegateRoleArgs ${args}`);
      }
    }
  );
}

export function getHolderDelegateRoleSeedDecoder(): VariableSizeDecoder<HolderDelegateRoleSeed> {
  return transformDecoder(
    getUtf8Decoder(),
    (seed: string): HolderDelegateRoleSeed => seed as HolderDelegateRoleSeed
  );
}

export function getHolderDelegateRoleSeedCodec(): VariableSizeCodec<
  HolderDelegateRoleSeedArgs,
  HolderDelegateRoleSeed
> {
  return combineCodec(
    getHolderDelegateRoleSeedEncoder(),
    getHolderDelegateRoleSeedDecoder()
  );
}
