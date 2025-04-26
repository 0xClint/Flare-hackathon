import { createPublicClient, http } from "viem";
import { flareTestnet, mainnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: flareTestnet,
  transport: http(),
});
