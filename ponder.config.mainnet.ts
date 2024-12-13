import { createConfig } from "ponder";
import { http } from "viem";

import { ENSRentABI } from "./abis/ENSRent";

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL,
  },
  contracts: {
    ENSRent: {
      abi: ENSRentABI,
      network: {
        mainnet: {
          address: "0xd14Ec04E51E125d0aC1A11Fa328F2f06cA4969F6",
          startBlock: 21383634
        }
      }
    },
  },
});
