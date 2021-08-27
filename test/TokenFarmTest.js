const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Token Farm contract", () =>{
   let  DaiToken, daiToken, DappToken, dappToken, TokenFarm, tokenFarm, transferToContract, transferToStaker,deployer, staker1, staker2
   beforeEach(async () =>{
     [deployer, staker1, staker2, _] = await ethers.getSigners();
     // Deploy Dai Token
      DaiToken = await hre.ethers.getContractFactory("DaiToken");
      daiToken = await DaiToken.deploy();

      await daiToken.deployed();

      console.log("DaiToken deployed to:", daiToken.address);

      // Deploy Dapp Token
      DappToken = await hre.ethers.getContractFactory("DappToken");
      dappToken = await DappToken.deploy();

      await daiToken.deployed();

      console.log("DappToken deployed to:", dappToken.address);

      // Deploy Token Farm
      TokenFarm = await hre.ethers.getContractFactory("TokenFarm");
      tokenFarm = await TokenFarm.deploy(dappToken.address, daiToken.address);

      await tokenFarm.deployed();

      console.log("Token Farm deployed to:", tokenFarm.address);

      //convert wei to ethers
      
      function tokens(n){
        return ethers.utils.parseEther(n)
      };


      //Transfer Dapp tokens to token farm contract

      transferToContract = await dappToken.transfer(tokenFarm.address, tokens('1000000'), {from : deployer.address})
      
      //Transfer 100 dai tokens to the investor
      transferToStaker = await daiToken.transfer(staker1.address, '100000000000000000000', {from : deployer.address})
    });
    
    
    describe("Mock Dai Deployment", async () => {
      it("has a name", async () => {
        const name = await daiToken.name()
        expect(name).to.equal('Mock DAI Token')
      });
    })

    describe("Dapp Token Deployment", async () => {
      it("has a name", async () => {
        const name = await dappToken.name()
        expect(name).to.equal('DApp Token')
      });
    })

    describe("Token Farm Deployment", async () => {
      it("has a name", async () => {
        const name = await tokenFarm.name()
        expect(name).to.equal('DApp Token Farm')
      });

      it("contract has token", async () => {
        
      })


    })


});

