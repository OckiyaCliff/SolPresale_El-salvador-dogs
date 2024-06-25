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
  "BV2YnrJpWTFnv4hMQ5byGmqf8TZNRrGrzLgKdzixnUFH",
  "Euft3UZLxrxDLBxzPB7MmuKcxoeWPRaJDKpSQiDxiaqp",
  "JteH15t9JFTaswwecC3Lt95UJ3hLcnb4pxQNLbAidUB",
  "5d7WEhPyW5HrT3MCnDJUrZ6VdUzUkj4woEA4KMGU2ovX",
  "2NtyfBRiAaoShUU9nBUYvkozpdxjuEr11j4MP4vYpNh1",
  "CreomCVxJHyV7dBxXTVf4B3QGPkvEjcMZPBUXQT31m94",
  "XFQgAfzjaao9Dt91jsPEv1orXdGCKvYaYRHMbsNmZY3",
  "EY37Px1GmtU4ff8arxPLsXTmSTic74aYJ4buMCwHyRNy",
  "EAy8LESX85CT1H2SDLu7U5JMJXMqr8TpPnJa369YwDyg",
  "9rq7xDuYWmGGCuenPhqHYHJXDg68SN94CBpwEBG4XzEP",
  "7DoaqRQByWiCqARVRUj5ePD6zqMGdSGuqZbs9uDs7Ukg",
  "9kXajyZqMTD4RijveQSNTkito4GDKDVDk49vj3yFLUTV",
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

  const targetDate = moment("2024-06-25T18:00:00+01:00"); // 25th June 2024, 6:00 PM WAT
  const now = moment();
  const isCountdownEnded = now.isAfter(targetDate);
  const expiryTimestamp = new Date(targetDate.toISOString());

  return (
    <main className="flex flex-col items-center justify-center bg-black p-4 sm:p-10 min-h-screen relative">
      <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#c507ff] rounded-full absolute z-0 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 blur-[170px]"></div>
      {connected && (isWhitelisted || !isWithinExclusivePeriod) ? (
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