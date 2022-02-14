const SendEth2Me = artifacts.require("SendEth2Me");
const { assert } = require("chai");
const { BN, ether, time } = require("openzeppelin-test-helpers");
const { web3 } = require("openzeppelin-test-helpers/src/setup");

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
      const initialBalance = await web3.eth.getBalance(accounts[1]);
      await contract.sendEther(accounts[1], { value: ether("1.0"), from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0.01").toString());

      const expected = new BN(initialBalance).add(new BN(ether("0.99")));
      assert.equal(await web3.eth.getBalance(accounts[1]), expected.toString());
    });

    it("send 1 wei to accounts[2]", async () => {
      const initialBalance = await web3.eth.getBalance(accounts[2]);
      await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));

      await contract.sendEther(accounts[2], { value: 1, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 0);
      const expected = new BN(initialBalance).add(new BN(ether("0.000000000000000001")));
      assert.equal(await balanceOf(accounts[2]), expected);
    });

    it("send 11 wei to accounts[3]", async () => {
      const initialBalance = await web3.eth.getBalance(accounts[3]);
      await contract.sendEther(accounts[3], { value: 11, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 1);
      const expected = new BN(initialBalance).add(new BN(ether("0.000000000000000010")));
      assert.equal(await balanceOf(accounts[3]), expected);
    });

    it("send 110 wei to accounts[4]", async () => {
      const initialBalance = await web3.eth.getBalance(accounts[4]);
      await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));

      await contract.sendEther(accounts[4], { value: 110, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 1);
      const expected = new BN(initialBalance).add(new BN(ether("0.000000000000000109")));
      assert.equal(await balanceOf(accounts[4]), expected);
    });

    it("send 1100 wei to accounts[5]", async () => {
      const initialBalance = await web3.eth.getBalance(accounts[5]);
      if ((await balanceOf(contract.address)) > 0) await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));

      await contract.sendEther(accounts[5], { value: 1100, from: accounts[0] });

      assert.equal(await balanceOf(contract.address), 11);
      const expected = new BN(initialBalance).add(new BN(ether("0.000000000000001089")));
      assert.equal(await balanceOf(accounts[5]), expected);
    });

    it("withdraw from contract", async () => {
      const initialBalance = await balanceOf(accounts[0]);
      const collected = await balanceOf(contract.address);
      
      const tx = await contract.withdraw({ from: accounts[0] });
      assert.equal(await balanceOf(contract.address), ether("0"));
      
      const defaultGasPrice = await web3.eth.getGasPrice();
      const effectiveGasPrice = web3.utils.hexToNumberString(tx.receipt.effectiveGasPrice);
      const gasPrice = effectiveGasPrice ? effectiveGasPrice : defaultGasPrice;
      
      const gasFee = new BN(gasPrice).mul(new BN(tx.receipt.gasUsed));
      const expected = new BN(initialBalance).sub(gasFee).add(new BN(collected));
      assert.equal(await balanceOf(accounts[0]), expected.toString());
    });
  });
});
