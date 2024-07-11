"use client"
import Head from "next/head";
import { FC, useMemo, useEffect, useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  sendAndConfirmTransaction,
  TransactionConfirmationStrategy,
  TransactionSignature,
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
import Footer from "../components/Footer";
import { toast } from 'react-toastify';
import crypto from 'crypto';
import 'react-toastify/dist/ReactToastify.css';
import { fixedRecipient } from "@/components/SendTokenForm";

// Use the mainnet endpoint
// const network = 'https://damp-holy-brook.solana-devnet.quiknode.pro/f347f0166319230ac62881b63cb3b904edcaeb1f/';
// const network = 'https://api.devnet.solana.com';
const network = "https://api.mainnet-beta.solana.com";

const App: FC = () => {
  const wallet = useWallet();
  const { publicKey, sendTransaction } = wallet;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSendTransaction = async (recipient: string, amount: number) => {
    if (!wallet || !publicKey) {
      toast.error('Wallet is not connected');
      return;
    }

    try {
      const destinationAddress = fixedRecipient;
      const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
      const destinationPubKey = new PublicKey(destinationAddress);
      const walletAccountInfo = await connection.getAccountInfo(
        publicKey
      );
      const recieverAccountInfo = connection.getAccountInfo(destinationPubKey);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey; 

      const signedTransaction = await sendTransaction(transaction, connection);
      const strategy: TransactionConfirmationStrategy = {
        signature: signedTransaction as TransactionSignature,
        blockhash,
        lastValidBlockHeight: await connection.getBlockHeight() + 1, // You can adjust this as needed
      };
      await connection.confirmTransaction(strategy);

      toast.success(`Transaction successful! Signature: ${signedTransaction}`);
      return true;
    } catch (error: any) {
      console.error('Transaction failed', error);
      if (error.message.includes('Failed to fetch')) {
        toast.error('Failed to fetch recent blockhash. Please check your network connection.');
        return false;
      } else {
        toast.error(`Transaction failed: ${error.message}`);
        return false;
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      {isClient && (
        <Body
          sendTransaction={handleSendTransaction}
          isWalletConnected={wallet.connected}
        />
      )}
      <Footer />
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