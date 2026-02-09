// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MoltDuel is Ownable, ReentrancyGuard {
    IERC20 public duelToken;

    enum Choice { ROCK, PAPER, SCISSORS }
    enum Result { WIN, LOSE, DRAW }

    event DuelPlayed(address indexed player, Choice playerChoice, Choice aiChoice, Result result, uint256 amount, uint256 payout);
    event FundsDeposited(address indexed sender, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    // Nonce for pseudo-randomness
    uint256 private nonce;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        duelToken = IERC20(_tokenAddress);
    }

    function play(Choice playerChoice, uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(duelToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(duelToken.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

        // Transfer tokens from player to contract
        require(duelToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // AI Logic (Pseudo-random for Hackathon)
        // In Mainnet, use Chainlink VRF or Pyth Entropy
        Choice aiChoice = Choice(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % 3);
        nonce++;

        Result result;
        uint256 payout = 0;

        if (playerChoice == aiChoice) {
            result = Result.DRAW;
            payout = amount;
        } else if (
            (playerChoice == Choice.ROCK && aiChoice == Choice.SCISSORS) ||
            (playerChoice == Choice.PAPER && aiChoice == Choice.ROCK) ||
            (playerChoice == Choice.SCISSORS && aiChoice == Choice.PAPER)
        ) {
            result = Result.WIN;
            payout = amount * 2;
        } else {
            result = Result.LOSE;
            payout = 0;
        }

        // Handle Payout
        if (payout > 0) {
            require(duelToken.balanceOf(address(this)) >= payout, "Contract has insufficient funds");
            require(duelToken.transfer(msg.sender, payout), "Payout failed");
        }

        emit DuelPlayed(msg.sender, playerChoice, aiChoice, result, amount, payout);
    }

    // Admin functions
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(duelToken.transfer(msg.sender, amount), "Withdraw failed");
        emit FundsWithdrawn(msg.sender, amount);
    }

    function depositFunds(uint256 amount) external onlyOwner {
        require(duelToken.transferFrom(msg.sender, address(this), amount), "Deposit failed");
        emit FundsDeposited(msg.sender, amount);
    }
}
