import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

let client;

export function initWalletClient() {
  if (typeof window !== "undefined" && window.ethereum) {
    client = createWalletClient({
      chain: mainnet,
      transport: custom(window.ethereum),
    });
    return true;
  } else {
    console.error("Ethereum provider not found");
    return false;
  }
}

export function getWalletClient() {
  return client;
}

export async function getWalletAddress() {
  if (!client) throw new Error("Wallet not initialized");
  const addresses = await client.requestAddresses();
  console.log(addresses[0]);
  return addresses[0];
}
