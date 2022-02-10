const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const rinkeby_rpc_url = "https://rinkeby.infura.io/v3/b844db49cee74597972b0dffb11fefda";
const maticmainnet_rpc_url = "https://rpc-mainnet.maticvigil.com";
const maticmumbai_rpc_url = "https://matic-mumbai.chainstacklabs.com/";

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "5777", // Any network (default: none)
      disableConfirmationListener: true,
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
      gasPrice: 28000000000,
    },
  },
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: "^0.8.9",
    },
  },
};
