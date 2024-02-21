import { useState, useEffect } from "react";
import Header from "./components/Header";
import topCorner from "./assets/images/top-corner.png";
import bottomCorner from "./assets/images/bottom-corner.png";
import bgImage from "./assets/images/bg-image.png";
import HeroHeading from "./components/HeroHeading";
import Form from "./components/Form";
// import Wallet from "./wallet/Wallet";
// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi1/react";


import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  polygonMumbai
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
// import { defineConfig, loadEnv } from 'vite';

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  // [polygon],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Art Passage',
  projectId: '9bae6a61ed76de6e2dc5eba428d2745e',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = "9bae6a61ed76de6e2dc5eba428d2745e";

// // 2. Create wagmiConfig
// const metadata = {
//   name: "Web3Modal",
// };

// const chains = [mainnet, arbitrum, polygon, xdc];
// const wagmiConfig = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
// });

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {
  return (
  
  
  // <WagmiConfig config={wagmiConfig}>

  <WagmiConfig config={wagmiConfig}>
  <RainbowKitProvider chains={chains}>
        
  <div className="w-full transition duration-500 h-screen font-sora text-2xl flec flex-col text-white ">
    <div>
      <img
        src={topCorner}
        className="h-80 absolute top-0 left-0 object-cover -z-30"
      />
      <img
        src={bgImage}
        className="w-screen bg-gradient-screen h-screen absolute bg-no-repeat object-cover -z-40"
      />
      <img
        src={bottomCorner}
        className=" h-80  absolute bottom-0 right-0 bg-no-repeat object-cover -z-40"
      />
      <div className="bg-gradient-to-tl from-black to-transparent h-screen w-screen top-0 absolute opacity-60 -z-30"></div>
      <div className="bg-gradient-to-bl from-transparent to-black h-screen w-screen top-0 absolute opacity-30 -z-30"></div>
      <div className="bg-gradient-to-tl from-black bottom-0 to-transparent h-screen w-screen absolute opacity-30 -z-30"></div>
      <div className="bg-gradient-to-br from-black to-transparent bottom-0 h-screen w-screen absolute opacity-60 -z-30"></div>
    </div>
    <Header />
    <HeroHeading />
    <Form />
  </div>
  </RainbowKitProvider>
    </WagmiConfig>
  // </WagmiConfig>
  );
}

export default App;
