const Web3 = require("web3");
const web3 = new Web3();

const getEnv = (env) => {
  const value = process.env[env];
  if (typeof value === "undefined") {
    throw new Error(`${env} has not been set.`);
  }
  return value;
};
const mainnet_rpc_url = getEnv("ETH_MAINNET_URL");
const mainnet_network_id = getEnv("ETH_MAINNET_NETWORK_ID");

const kovan_rpc_url = getEnv("ETH_KOVAN_URL");
const kovan_network_id = getEnv("ETH_KOVAN_NETWORK_ID");

const rinkeby_rpc_url = getEnv("ETH_RINKEBY_URL");
const rinkeby_network_id = getEnv("ETH_RINKEBY_NETWORK_ID");

const ropsten_rpc_url = getEnv("ETH_ROPSTEN_URL");
const ropsten_network_id = getEnv("ETH_ROPSTEN_NETWORK_ID");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const maticmainnet_rpc_url = "https://polygon-rpc.com/";
const maticmumbai_rpc_url = "https://matic-mumbai.chainstacklabs.com/";

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "5777", // Any network (default: none)
      disableConfirmationListener: true,
      gasPrice: web3.utils.toWei("20", "gwei"),
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, maticmumbai_rpc_url),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: false,
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, maticmainnet_rpc_url),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 50,
      gasPrice: web3.utils.toWei("40", "gwei"),
      skipDryRun: true,
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, kovan_rpc_url),
      network_id: kovan_network_id,
      gasPrice: web3.utils.toWei("30", "gwei"),
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, ropsten_rpc_url),
      network_id: ropsten_network_id,
      gasPrice: web3.utils.toWei("30", "gwei"),
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, rinkeby_rpc_url),
      network_id: rinkeby_network_id,
      gasPrice: web3.utils.toWei("10", "gwei"),
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, mainnet_rpc_url),
      network_id: mainnet_network_id,
      gas: 600000,
      gasPrice: web3.utils.toWei("30", "gwei"),
      skipDryRun: true,
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
          //runs: 1, // optimize for deployment
          runs: 4294967295, // optimize for transactions
        },
      },
    },
  },
  db: {
    enabled: true,
  },
};
