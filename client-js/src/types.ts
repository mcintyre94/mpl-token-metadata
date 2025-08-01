import { Address } from "@solana/kit";

export type WithAddress<T> = T & { address: Address };
