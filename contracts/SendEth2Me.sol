// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11 <0.9.0;

contract SendEth2Me {
    address private _owner = msg.sender;

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) private {
        _owner = newOwner;
    }

    function sendEther(address recipient) public payable {
        require(msg.value > 0, "0 ether (wei) will not support anybody.");

        if (msg.value == 1) {
            payable(recipient).transfer(1);
            return;
        }

        uint256 amount;
        if (msg.value <= 100) {
            amount = msg.value - 1;
        } else {
            amount = _percent99(msg.value);
        }
        payable(recipient).transfer(amount);
    }
    
    function _percent99(uint256 amount) private pure returns (uint256) {
        uint256 onePercent = amount / 100;
        return amount - onePercent;
    }

    function withdraw() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance to withdraw");

        payable(_owner).transfer(contractBalance);
    }
}
