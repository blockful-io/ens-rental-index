import { createConfig } from "@ponder/core";
import { http } from "viem";

import { ENSRentABI } from "./abis/ENSRent";

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.PONDER_RPC_URL_11155111),
    },
  },
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL,
  },
  contracts: {
    ENSRent: {
      network: "sepolia",
      abi: ENSRentABI,
      address: "0x46e33904ba38c0bfc946464f26128119268ea8e8",
      startBlock: 7225182
    },
  },
});
