const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DuelToken
  const DuelToken = await hre.ethers.getContractFactory("DuelToken");
  const duelToken = await DuelToken.deploy();
  await duelToken.waitForDeployment();
  const tokenAddress = await duelToken.getAddress();
  console.log("DuelToken deployed to:", tokenAddress);

  // Deploy MoltDuel Game
  const MoltDuel = await hre.ethers.getContractFactory("MoltDuel");
  const moltDuel = await MoltDuel.deploy(tokenAddress);
  await moltDuel.waitForDeployment();
  const gameAddress = await moltDuel.getAddress();
  console.log("MoltDuel deployed to:", gameAddress);

  console.log("\nDeployment Complete! 🚀");
  console.log("----------------------------------------------------");
  console.log(`Token Address: ${tokenAddress}`);
  console.log(`Game Address:  ${gameAddress}`);
  console.log("----------------------------------------------------");
  console.log("Don't forget to verify on MonadExplorer!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
