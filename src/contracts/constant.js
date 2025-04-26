export const SRN_CONTRACT_ADDRESS =
  "0x5f3630e2DCAAF215d9b720886F9D652EBC3fB957";

export const SRN_CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getSecureRandomNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isSecure",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
