"use client";
import moment from "moment";
import SendTokenForm from "./SendTokenForm";
import { Timer } from "./Timer";

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  const now = moment();
  const futureDate = moment('2024-12-31T23:59:59');
  const duration = moment.duration(futureDate.diff(now));
  const expiryTimestamp = new Date(now.add(duration).toISOString());
  return (
    <main className="flex flex-col items-center justify-center bg-black p-4 sm:p-10 min-h-screen relative">
      <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#c507ff] rounded-full absolute z-0 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 blur-[170px]"></div>
      {isWalletConnected ? (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10  bg-opacity-75">
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
    </main>
  );
};

export default Body;
