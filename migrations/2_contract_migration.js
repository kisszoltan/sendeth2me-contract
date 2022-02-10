const SendEth2Me = artifacts.require("SendEth2Me");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(SendEth2Me);
  //let contract = await SendEth2Me.deployed();
};
