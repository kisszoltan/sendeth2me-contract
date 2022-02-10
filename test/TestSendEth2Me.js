const SendEth2Me = artifacts.require("SendEth2Me");
const { assert } = require("chai");
const { BN, ether, time } = require("openzeppelin-test-helpers");

contract("Send Ether 2 Me", (accounts) => {
  let contract;

  async function balanceOf(address) {
    return (await web3.eth.getBalance(address)).toString();
  }

  before(async () => {
    contract = await SendEth2Me.deployed();
  });

  describe("Simple use-cases", async () => {
    it("send 1 eth to accounts[1]", async () => {
      await contract.sendEther(accounts[1], { value: ether("1"), from: accounts[0] });

      assert.equal(await balanceOf(contract.address), ether("0.01"));
      assert.equal(await balanceOf(accounts[1]), ether("100.99"));
    });

    it("send 1 wei to accounts[2]", async () => {
      await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));

      await contract.sendEther(accounts[2], { value: 1, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 0);
      assert.equal(await balanceOf(accounts[2]), ether("100.000000000000000001"));
    });

    it("send 11 wei to accounts[3]", async () => {
      await contract.sendEther(accounts[3], { value: 11, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 1);
      assert.equal(await balanceOf(accounts[3]), ether("100.000000000000000010"));
    });

    it("send 110 wei to accounts[4]", async () => {
      await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));

      await contract.sendEther(accounts[4], { value: 110, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 1);
      assert.equal(await balanceOf(accounts[4]), ether("100.000000000000000109"));
    });

    it("send 1100 wei to accounts[5]", async () => {
      await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));

      await contract.sendEther(accounts[5], { value: 1100, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 11);
      assert.equal(await balanceOf(accounts[5]), ether("100.000000000000001089"));
    });

    it("withdraw from contract", async () => {
      const initialBalance = await web3.eth.getBalance(accounts[0]);
      const tx = await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));

      const gasPrice = await web3.eth.getGasPrice();
      const gasFee = new BN(gasPrice).mul(new BN(tx.receipt.gasUsed));

      assert.equal(
        new BN(initialBalance).sub(gasFee).add(new BN("11")).toString(),
        (await balanceOf(accounts[0])).toString()
      );
    });
  });
});
