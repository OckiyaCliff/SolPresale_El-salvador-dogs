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
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import Header from "../components/Header";
import Body from "../components/Body";

// Use the devnet endpoint
const network = "https://api.devnet.solana.com";

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
    </div>
  );
};

const Home: FC = () => {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <>
      <Head>
        <title>El-Salvador Dogs Presale</title>
        <meta
          name="El-Salavdor Presale"
          content="This is El-Salavdor Presale site"
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
