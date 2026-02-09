// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DuelToken is ERC20, Ownable {
    constructor() ERC20("Molt Duel Token", "DUEL") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Faucet for testing
    function faucet() public {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
