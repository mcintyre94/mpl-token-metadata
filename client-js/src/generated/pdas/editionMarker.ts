/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  getAddressEncoder,
  getProgramDerivedAddress,
  getUtf8Encoder,
  type Address,
  type ProgramDerivedAddress,
} from '@solana/kit';

export type EditionMarkerSeeds = {
  /** The address of the mint account */
  mint: Address;
  /** The floor of the edition number divided by 248 as a string. I.e. ⌊edition/248⌋. */
  editionMarker: string;
};

export async function findEditionMarkerPda(
  seeds: EditionMarkerSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as Address<'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('metadata'),
      getAddressEncoder().encode(programAddress),
      getAddressEncoder().encode(seeds.mint),
      getUtf8Encoder().encode('edition'),
      getUtf8Encoder().encode(seeds.editionMarker),
    ],
  });
}
