// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11 <0.9.0;

library SafishMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }
}

contract SendEth2Me {
    using SafishMath for uint256;
    address private _owner;

    constructor() {
        _transferOwnership(msg.sender);
    }

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
            amount = msg.value.sub(1);
        } else {
            amount = _99(msg.value);
        }

        payable(recipient).transfer(amount);
    }

    function _99(uint256 amount) private pure returns (uint256) {
        uint256 onePercent = amount.div(100);
        return amount.sub(onePercent);
    }

    function withdraw() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance to withdraw");

        payable(_owner).transfer(contractBalance);
    }
}
