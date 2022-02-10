const SendEth2Me = artifacts.require("SendEth2Me");
const { BN, ether, time } = require("openzeppelin-test-helpers");

contract("Send Ether 2 Me", (accounts) => {
  let contract;

  before(async () => {
    contract = await SendEth2Me.deployed();
  });

  describe("Simple use-case", async () => {
    it("...works", async () => {
      assert.isOk(true);
    });
  });
});
