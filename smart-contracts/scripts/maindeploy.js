 // We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const { verify } = require("./verifyContract");


async function main() {
  
  // try {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
      );
    } 
    
    const [deployer] = await ethers.getSigners(); 

const baseUri = "https://ipfs.io/ipfs/QmQu4nKN3iuoMAVR1Ga3vrUMrjA12xrJQriQv9zwYBfjaP/"
    ////////////////////////////////////////////ArtPassage////////////////////////////////////////
  const initialLimit = 100;
  const ArtPassage = await ethers.getContractFactory("ArtPassage")
  const nftContract = await ArtPassage.deploy(deployer.address, initialLimit,baseUri)
  await nftContract.deployed()
  console.log("ArtPassage Address", nftContract.address)
  
  ////////////////////////////////////////////Calling Functions////////////////////////////////////////
  
  await nftContract.safeMint(deployer.address)
  // console.log("1 uri", await nftContract.tokenURI("1"))

  console.log("Verifying ArtPassage Address")
  const args = [deployer.address, initialLimit,baseUri]
  await verify(nftContract.address,args)


   
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat run scripts/maindeploy.js --network hardhat