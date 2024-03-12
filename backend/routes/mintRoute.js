const express = require("express");
const ethers = require("ethers");
const contractAbi = require("../utils/abi.json");
const router = express.Router();
require("dotenv").config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);

console.log("CONTRACT ADRESS: ", contractAddress);
console.log("PRIVATE KEY: ", privateKey);
console.log("PROVIDER: ", provider);

router.post("/mint", async (req, res) => {
  try {
    const { userAddress } = req.body;
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = contract.connect(wallet);
    const balance = Number(await contractWithSigner.balanceOf(userAddress));
    if (balance == 0) {
      const response = await contractWithSigner.safeMint(userAddress);
      await response.wait();
      res.status(200).json({ message: "NFT Minted Successfully" });
    } else {
      res.status(200).json({ message: "Already Owned NFT" });
    }
  } catch (error) {
    console.log("🚀", error);
    res.status(500).json({
      message: "Server: Something went wrong",
      response: error.message,
    });
  }
});

router.get("/mint/:userAddress", async (req, res) => {
  try {
    const { userAddress } = req.params;

    // console.log("req.params",req.params);
    // console.log("req.query",req.query);
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );

    const filter = contract.filters.Transfer(null, userAddress, null);
    const transferEvents = await contract.queryFilter(filter);
    const data = transferEvents.map((event) => {
      return event.args.tokenId.toString();
    });

    let nftID = null;
    const hasNft = data.length > 0;
    if (hasNft) {
      nftID = data[0];
    }

    res.status(200).json({ hasNft, nftID });
  } catch (error) {
    console.log("🚀", error);
    res.status(500).json({
      message: "Server: Something went wrong",
      response: error.message,
    });
  }
});

module.exports = router;
