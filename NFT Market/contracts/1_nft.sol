// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract NFTCart {
    address payable public owner;
    mapping(address => uint) public balances;
    //uint public totalAmount;

    constructor() {
        owner = payable(msg.sender); // Set the contract deployer as the owner
    }

    receive() external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        //totalAmount += msg.value;
    }

    // function pay() external {
    //     require(totalAmount > 0, "No funds available to transfer");

    //     uint amountToTransfer = totalAmount;
    //     totalAmount = 0;
    //     owner.transfer(amountToTransfer);
    // }
    function pay(uint amt)  external{
        uint totalAmount = amt;//balances[msg.sender]
        require(totalAmount > 0, "No funds available to transfer");

        balances[msg.sender] = 0;
        owner.transfer(totalAmount);
    }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
