export const SRN_CONTRACT_ADDRESS =
  "0x5f3630e2DCAAF215d9b720886F9D652EBC3fB957";

export const PRICE_FEED_CONTRACT_ADDRESS =
  "0xc4842D8E5f639B1AA9c4070cFe9aE0FF24d80ae4";

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

export const PRICE_FEED_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "feedIds",
    outputs: [
      {
        internalType: "bytes21",
        name: "",
        type: "bytes21",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "flrUsdId",
    outputs: [
      {
        internalType: "bytes21",
        name: "",
        type: "bytes21",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFlrUsdPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFlrUsdPriceWei",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFtsoV2CurrentFeedValues",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_feedValues",
        type: "uint256[]",
      },
      {
        internalType: "int8[]",
        name: "_decimals",
        type: "int8[]",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
