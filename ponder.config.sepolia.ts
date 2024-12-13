import { createConfig } from "ponder";
import { http } from "viem";

import { ENSRentABI } from "./abis/ENSRent";

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.PONDER_RPC_URL_11155111),
    }
  },
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL,
  },
  contracts: {
    ENSRent: {
      abi: ENSRentABI,
      network: {
        sepolia: {
          address: "0xD85b9443EFd1fDb1cad7784388843613FbC3a5aA",
          startBlock: 7250895
        }
      }
    },
  },
});
