// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11 <0.9.0;

contract SendEth2Me {
    address private _owner = msg.sender;

    modifier onlyOwner() {
        require(_owner == msg.sender, "Caller is not the owner");
        _;
    }

    modifier notZero(address _address) {
        require(_address != address(0), "Avoid using zero address");
        _;
    }

    modifier hasValue() {
        require(msg.value > 0, "0 ether (wei) will not support anybody");
        _;
    }

    modifier hasBalance() {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance");
        _;
    }

    function transferOwnership(address newOwner)
        public
        onlyOwner
        notZero(newOwner)
    {
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) private {
        _owner = newOwner;
    }

    function sendEther(address recipient) public payable hasValue {
        uint256 amount;
        if (msg.value == 1) {
            amount = 1;
        } else {
            amount = msg.value;
            if (msg.value <= 100) {
                amount -= 1;
            } else {
                uint256 onePercent = msg.value / 100;
                amount -= onePercent;
            }
        }

        payable(recipient).transfer(amount);
    }

    function withdraw() public onlyOwner hasBalance {
        uint256 contractBalance = address(this).balance;
        payable(_owner).transfer(contractBalance);
    }
}
