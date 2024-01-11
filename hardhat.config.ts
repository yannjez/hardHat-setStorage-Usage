import type  { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/findSlot";
import "./tasks/changeBalance";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: `https://rpc.ankr.com/eth`,
        blockNumber: 18720893,
      },
    },
  }
};

export default config;
