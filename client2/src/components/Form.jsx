import React, { useEffect, useState } from "react";
import backIcon from "../assets/icons/Vector 5.svg";
import axios from "axios";
import { useAccount } from "wagmi";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
  ConnectButton,
} from '@rainbow-me/rainbowkit';

const contractAddress = "0xa93544691c0134520AF6C2bBfF5775617aE4AED4";
//const baseUrl = "https://art-as-a-passage-backend.vercel.app/";
const baseUrl = "http://localhost:5000/"

function Form() {
  const { address } = useAccount();
  // State for input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isMintingLoading, setIsMintingLoading] = useState(false);
  const [nftStatusData, setNftStatusData] = useState({
    hasNft: false,
    nftID: null,
  });

  // Handle input changes
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle form submission
  const handleSubmit = () => {
    // Perform actions with form data, such as minting the NFT

    console.log("Form submitted with data:", {
      firstName,
      lastName,
      email,
      address,
    });
    if (firstName == "" || lastName == "" || email == "") {
      alert("Please provide all details before submitting");
      return false;
    }
    const apiUrl = `${baseUrl}api/mint`;
    //  const apiUrl = 'http://localhost:5000/api/mint';

    const postData = {
      userAddress: address,
    };
    setIsMintingLoading(true);
    axios
      .post(apiUrl, postData)
      .then((response) => {
        console.log("API response:", response.data);
        getUseNftStatus(address);
        alert(response?.data?.message);
      })
      .then(() => {
        axios
          .post(
            "https://sheet.best/api/sheets/383f2606-ef4f-48ad-9bbd-d6a9b91fe2d2",
            {
              firstName: firstName,
              lastName: lastName,
              email: email,
              address: address,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response from google sheet", response);
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        alert("Server: Something went wrong!!!");
        console.error("Error making API request:", error.message);
      })
      .finally(() => {
        setIsMintingLoading(false);
      });
  };

  const getUseNftStatus = (userAddress) => {
    const apiUrl = `${baseUrl}api/mint/${userAddress}`;
    //  const apiUrl = 'http://localhost:5000/api/mint';

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API response:", response.data);
        setNftStatusData(response.data);
      })
      .catch((error) => {
        setNftStatusData({
          hasNft: false,
          nftID: null,
        });
        console.error("Error making API request:", error.message);
      });
  };

  useEffect(() => {
    if (address) {
      getUseNftStatus(address);
    }
  }, [address]);

  return (
    <div className="w-full h-96 flex  justify-between items-center px-8 lg:px-64 ">
      <div className="h-full bg-form-bg min-w-full flex rounded-3xl py-6 border-2 items-center justify-center backdrop-blur-2xl border-white">
        {address ? (
          nftStatusData.hasNft ? (
            <>
              <label className="text-center text-lg">
                You're the owner of NFT #{nftStatusData.nftID} <br /> Contract
                address : {contractAddress}
              </label>
            </>
          ) : (
            <div className="flex  flex-col gap-7 w-full h-full px-6">
              <input
                className="w-full placeholder:text-white outline-none text-base lg:text-lg h-16 bg-transparent border-2 rounded-lg text-white px-4 border-white"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <input
                className="w-full placeholder:text-white outline-none text-base lg:text-lg h-16 bg-transparent border-2 rounded-lg text-white px-4 border-white"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <input
                className="w-full placeholder:text-white outline-none text-base lg:text-lg h-16 bg-transparent border-2 rounded-lg text-white px-4 border-white"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className="w-full h-16 cursor-pointer bg-white text-black uppercase text-base lg:text-lg border-2 rounded-lg flex  items-center justify-center border-white"
                onClick={handleSubmit}
                disabled={!address || isMintingLoading}
              >
                <span>
                  {isMintingLoading ? "Minting..." : "Mint your free nft"}
                </span>
              </button>
            </div>
          )
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
}
export default Form;
