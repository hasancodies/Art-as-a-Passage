// import { useState, useEffect } from "react";
// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi1/react";

// import { WagmiConfig } from "wagmi";
// import { arbitrum, mainnet } from "viem/chains";

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = "9bae6a61ed76de6e2dc5eba428d2745e";

// // 2. Create wagmiConfig
// const metadata = {
//   name: "Web3Modal",
//   description: "Web3Modal Example",
//   url: "https://web3modal.com",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// const chains = [mainnet, arbitrum];
// const wagmiConfig = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
// });

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains });

// export default function Wallet({ children }) {
//   const [ready, setReady] = useState(false);
//   useEffect(() => {
//     setTimeout(() => {
//       setReady(true);
//       console.log("ABC");
//     }, 5000);
//   }, []);
//   return (
//     <>
//       {ready ? (
//         <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
//       ) : null}
//     </>
//   );
// }
