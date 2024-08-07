"use client";
import { useEffect, useState } from 'react';
import moment from "moment";
import SendTokenForm from "./SendTokenForm";
import { Timer } from "./Timer";
import { useWallet } from '@solana/wallet-adapter-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EXCLUSIVE_PERIOD_DAYS = 2;

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  const { publicKey, connected } = useWallet();
  const [isWithinExclusivePeriod, setIsWithinExclusivePeriod] = useState(true);

  useEffect(() => {
    const exclusivePeriodEndDate = new Date();
    exclusivePeriodEndDate.setDate(exclusivePeriodEndDate.getDate() + EXCLUSIVE_PERIOD_DAYS);

    const now = new Date();
    setIsWithinExclusivePeriod(now <= exclusivePeriodEndDate);
  }, []);

  const targetDate = moment("2024-07-12T17:00:00+01:00");
  const now = moment();
  const isCountdownEnded = now.isAfter(targetDate);
  console.log(isCountdownEnded)
  const expiryTimestamp = new Date(targetDate.toISOString());

  return (
    <main className="flex flex-col items-center justify-center bg-black p-4 sm:p-10 min-h-screen relative">
      <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#c507ff] rounded-full absolute z-0 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 blur-[170px]"></div>
      {connected && isCountdownEnded ? (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10 bg-opacity-75">
          <SendTokenForm sendTransaction={sendTransaction} />
        </div>
      ) : (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10 bg-opacity-75 flex flex-col items-center justify-center">
          {!isCountdownEnded ? (
            <>
              <Timer expiryTimestamp={expiryTimestamp} />
              <p className="text-xl text-white pt-5">
                Please connect your wallet to Buy.
              </p>
            </>
          ) : (
            <p className="text-xl text-white pt-5">
              Whitelist Presale Phase is Live!!!
            </p>
          )}
        </div>
      )}
      <ToastContainer />
    </main>
  );
};

export default Body;
