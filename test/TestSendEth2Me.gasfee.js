const SendEth2Me = artifacts.require("SendEth2Me");
const { assert } = require("chai");
const { BN, ether, time } = require("openzeppelin-test-helpers");

contract("Send Ether 2 Me - Gas Fee", (accounts) => {
  let contract;

  async function balanceOf(address) {
    return (await web3.eth.getBalance(address)).toString();
  }

  before(async () => {
    contract = await SendEth2Me.deployed();
  });

  describe("Compare traditional transfer", async () => {
    it("with sendEther()", async () => {
      const gasPrice = await web3.eth.getGasPrice();

      const contractTx = await contract.sendEther(accounts[1], {
        value: ether("1"),
        from: accounts[0],
      });
      const contractGasFee = new BN(gasPrice).mul(new BN(contractTx.receipt.gasUsed));

      const transferTx = await web3.eth.sendTransaction({
        to: accounts[1],
        from: accounts[0],
        value: ether("1"),
      });
      const transactionGasFee = new BN(gasPrice).mul(new BN(transferTx.gasUsed));
      // console.log(contractGasFee.toString());
      // console.log(transactionGasFee.toString())
      assert.isOk(true);
    });
  });
});
