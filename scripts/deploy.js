// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Deploy Dai Token
  const DaiToken = await hre.ethers.getContractFactory("DaiToken");
  const daiToken = await DaiToken.deploy();

  await daiToken.deployed();

  console.log("DaiToken deployed to:", daiToken.address);

  // Deploy Dapp Token
  const DappToken = await hre.ethers.getContractFactory("DappToken");
  const dappToken = await DappToken.deploy();

  await daiToken.deployed();

  console.log("DappToken deployed to:", dappToken.address);

  // Deploy Token Farm
  const TokenFarm = await hre.ethers.getContractFactory("TokenFarm");
  const tokenFarm = await TokenFarm.deploy(dappToken.address, daiToken.address);

  await tokenFarm.deployed();

  console.log("Token Farm deployed to:", tokenFarm.address);

  function tokens(n){
    const wei= ethers.utils.parseEther(n)
    console.log(wei)
    return wei;

  }


  //Transfer Dapp tokens to token farm contract

  await dappToken.transfer(tokenFarm.address, tokens('1000000'))
   console.log("sent!")
  //Transfer 100 dai tokens to the investor
  //  await daiToken.transfer(investor.address, '100000000000000000000')
}






// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
