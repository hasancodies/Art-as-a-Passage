import React, { useEffect, useState } from "react";
import backIcon from "../assets/icons/Vector 5.svg";
// import { useWeb3Modal } from "@web3modal/wagmi1/react";

function HeroHeading() {
  return (
    <div className="w-full flex flex-col justify-between text-white items-center pt-5 relative pb-10">
      {/* <span className="w-2/5 absolute h-full top-0 bg-gradient-to-l from-black to-transparent"></span>
      <span className="w-2/5 absolute h-full top-0 bg-gradient-to-r from-black to-transparent"></span> */}
      <span className="bg-white w-3/4 lg:w-2/5 h-1"></span>
      <h2 className="capitalize lg:tracking-widest font-nebula-refular text-3xl lg:text-4xl font-normal drop-shadow-text-shadow my-3 ">
        Minting Page
      </h2>
      <span className="bg-white w-3/4 lg:w-2/5 h-1"></span>
    </div>
  );
}
export default HeroHeading;
