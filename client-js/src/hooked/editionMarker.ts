import { Address, ProgramDerivedAddress } from "@solana/kit";
import { findEditionMarkerPda } from "..";

export async function findEditionMarkerFromEditionNumberPda(seeds: {
  /** The address of the mint account */
  mint: Address;
  /** The edition number. */
  editionNumber: number | bigint;
}): Promise<ProgramDerivedAddress> {
  return findEditionMarkerPda({
    mint: seeds.mint,
    editionMarker: (BigInt(seeds.editionNumber) / 248n).toString(10),
  });
}
