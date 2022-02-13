const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const mainnet_rpc_url = "https://mainnet.infura.io/v3/b844db49cee74597972b0dffb11fefda";
const rinkeby_rpc_url = "https://rinkeby.infura.io/v3/b844db49cee74597972b0dffb11fefda";
const maticmainnet_rpc_url = "https://rpc-mainnet.maticvigil.com";
const maticmumbai_rpc_url = "https://matic-mumbai.chainstacklabs.com/";

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "5777", // Any network (default: none)
      disableConfirmationListener: true,
      gasPrice: 30000000000,
    },
    maticmumbai: {
      provider: () => new HDWalletProvider(mnemonic, maticmumbai_rpc_url),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: false,
    },
    maticmainnet: {
      provider: () => new HDWalletProvider(mnemonic, maticmainnet_rpc_url),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: false,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, rinkeby_rpc_url),
      network_id: 4,
      gas: 4500000,
      gasPrice: 1000000000,
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, mainnet_rpc_url),
      network_id: 1,
      gas: 4500000,
      gasPrice: 1000000000,
//    gasPrice: 48648877532,
    },
  },
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: "^0.8.11",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1500,
        },
      },
    },
  },
};
