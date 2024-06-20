"use client";
import SendTokenForm from "./SendTokenForm";
import { Timer } from "./Timer";

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  return (
    <main className="flex flex-col items-center justify-center bg-black p-4 sm:p-10 min-h-screen relative">
      <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#c507ff] rounded-full absolute z-0 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 blur-[170px]"></div>
      {isWalletConnected ? (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10  bg-opacity-75">
          <SendTokenForm sendTransaction={sendTransaction} />
        </div>
      ) : (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10 bg-opacity-75">
          <Timer expiryTimestamp={time} />
          <p className="text-xl text-white">
            Please connect your wallet to Buy.
          </p>
        </div>
      )}
    </main>
  );
};

export default Body;
