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
      address: "0xBB053293241f0880844C00f519989B4f38CC2142",
      startBlock: 7092100
    },
  },
});
