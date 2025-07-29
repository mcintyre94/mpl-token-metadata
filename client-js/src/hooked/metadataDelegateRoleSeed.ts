import { MetadataDelegateRole } from "../generated/types/metadataDelegateRole";
import {
  transformEncoder,
  getUtf8Encoder,
  VariableSizeEncoder,
  transformDecoder,
  getUtf8Decoder,
  VariableSizeDecoder,
  combineCodec,
  VariableSizeCodec,
} from "@solana/kit";

export type MetadataDelegateRoleSeed =
  | "authority_item_delegate"
  | "collection_delegate"
  | "use_delegate"
  | "data_delegate"
  | "programmable_config_delegate"
  | "data_item_delegate"
  | "collection_item_delegate"
  | "prog_config_item_delegate";

export type MetadataDelegateRoleSeedArgs =
  | MetadataDelegateRoleSeed
  | MetadataDelegateRole;

export function getMetadataDelegateRoleSeedEncoder(): VariableSizeEncoder<MetadataDelegateRoleSeedArgs> {
  return transformEncoder(
    getUtf8Encoder(),
    (args: MetadataDelegateRoleSeedArgs): string => {
      switch (args) {
        case MetadataDelegateRole.AuthorityItem:
          return "authority_item_delegate";
        case MetadataDelegateRole.Collection:
          return "collection_delegate";
        case MetadataDelegateRole.Use:
          return "use_delegate";
        case MetadataDelegateRole.Data:
          return "data_delegate";
        case MetadataDelegateRole.ProgrammableConfig:
          return "programmable_config_delegate";
        case MetadataDelegateRole.DataItem:
          return "data_item_delegate";
        case MetadataDelegateRole.CollectionItem:
          return "collection_item_delegate";
        case MetadataDelegateRole.ProgrammableConfigItem:
          return "prog_config_item_delegate";
        default:
          // TODO: Coded error.
          throw new Error(`Invalid MetadataDelegateRoleArgs ${args}`);
      }
    }
  );
}

export function getMetadataDelegateRoleSeedDecoder(): VariableSizeDecoder<MetadataDelegateRoleSeed> {
  return transformDecoder(
    getUtf8Decoder(),
    (seed: string): MetadataDelegateRoleSeed => seed as MetadataDelegateRoleSeed
  );
}

export function getMetadataDelegateRoleSeedCodec(): VariableSizeCodec<
  MetadataDelegateRoleSeedArgs,
  MetadataDelegateRoleSeed
> {
  return combineCodec(
    getMetadataDelegateRoleSeedEncoder(),
    getMetadataDelegateRoleSeedDecoder()
  );
}
