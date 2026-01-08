//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function decimals() external view returns (uint8);
    function balanceOf(address owner) external view returns (uint256);
}

contract TokenSale {
    uint256 public tokenPriceInWei = 1 ether;
    IERC20 public token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function purchase() external payable {
        require(msg.value >= tokenPriceInWei, "Not enough ETH sent");

        uint256 tokensToTransfer = msg.value / tokenPriceInWei;
        uint256 tokenAmount = tokensToTransfer * (10 ** token.decimals());

        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "TokenSale out of tokens"
        );

        bool success = token.transfer(msg.sender, tokenAmount);
        require(success, "Token transfer failed");

        uint256 remainder = msg.value - (tokensToTransfer * tokenPriceInWei);
        if (remainder > 0) {
            payable(msg.sender).transfer(remainder);
        }
    }
}