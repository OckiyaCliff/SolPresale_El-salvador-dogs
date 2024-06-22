"use client"
import { useEffect, useState } from 'react';
import moment from "moment";
import SendTokenForm from "./SendTokenForm";
import { Timer } from "./Timer";
import { useWallet } from '@solana/wallet-adapter-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WHITELISTED_WALLETS = [
  "63M3o4aRYNdRBSd2foqNWpmuwBwy6enXofiEYsg1MhrQ",
  "EVrHikJwztbwkffJFL3NEJ5cAXvM17sy9xMw1Ea5YXxn",
];

const EXCLUSIVE_PERIOD_DAYS = 2;

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  const { publicKey, connected } = useWallet();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isWithinExclusivePeriod, setIsWithinExclusivePeriod] = useState(true);

  useEffect(() => {
    const exclusivePeriodEndDate = new Date();
    exclusivePeriodEndDate.setDate(exclusivePeriodEndDate.getDate() + EXCLUSIVE_PERIOD_DAYS);

    const now = new Date();
    setIsWithinExclusivePeriod(now <= exclusivePeriodEndDate);

    if (connected && publicKey) {
      if (WHITELISTED_WALLETS.includes(publicKey.toBase58())) {
        setIsWhitelisted(true);
      } else {
        toast.error("This wallet is not whitelisted. Please wait for the public presales.");
      }
    }
  }, [connected, publicKey]);

  const now = moment();
  const futureDate = moment("2024-12-31T23:59:59");
  const duration = moment.duration(futureDate.diff(now));
  const expiryTimestamp = new Date(now.add(duration).toISOString());

  return (
    <main className="flex flex-col items-center justify-center bg-black p-4 sm:p-10 min-h-screen relative">
      <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#c507ff] rounded-full absolute z-0 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 blur-[170px]"></div>
      {connected && (isWhitelisted || !isWithinExclusivePeriod) ? (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10 bg-opacity-75">
          <SendTokenForm sendTransaction={sendTransaction} />
        </div>
      ) : (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10 bg-opacity-75 flex flex-col items-center justify-center">
          <Timer expiryTimestamp={expiryTimestamp} />
          <p className="text-xl text-white pt-5">
            Please connect your wallet to Buy.
          </p>
        </div>
      )}
      <ToastContainer />
    </main>
  );
};

export default Body;