"use client";
import Head from "next/head";
import { FC, useMemo, useEffect, useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, TrustWalletAdapter } from "@solana/wallet-adapter-wallets";
import { SolletWalletAdapter } from "@solana/wallet-adapter-sollet";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { MathWalletAdapter } from "@solana/wallet-adapter-mathwallet";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/footer"; // Import the new Footer component

// Use the mainnet endpoint
// const network = "https://api.mainnet-beta.solana.com ";
const network = "https://api.mainnet-beta.solana.com";

const App: FC = () => {
  const wallet = useWallet();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendTransaction = async (recipient: string, amount: number) => {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet first");
      return;
    }

    if (!wallet.signTransaction) {
      alert("The connected wallet does not support transaction signing.");
      return;
    }

    const connection = new Connection(network, "confirmed");
    const recipientPublicKey = new PublicKey(recipient);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    try {
      const signedTransaction = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature, "confirmed");
      alert(`Transaction successful with signature: ${signature}`);
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      {isClient && (
        <Body
          sendTransaction={sendTransaction}
          isWalletConnected={wallet.connected}
        />
      )}
      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

const Home: FC = () => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolletWalletAdapter(),
      new SolflareWalletAdapter(),
      new MathWalletAdapter(),
      new TrustWalletAdapter()
    ],
    []
  );

  return (
    <>
      <Head>
        <title>El-Salvador Dogs Presale</title>
        <meta
          name="El-Salvador Presale"
          content="This is the El-Salvador Presale site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <App />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default Home;