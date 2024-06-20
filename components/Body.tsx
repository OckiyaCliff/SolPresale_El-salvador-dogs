"use client";
import SendTokenForm from './SendTokenForm';

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  return (
    <main className="flex flex-col items-center justify-center bg-black p-10 min-h-screen relative">
      <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#940ebd] rounded-[100%] absolute z-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[200px]"></div>
      {isWalletConnected ? (
        <div className="relative p-10 rounded-sm shadow-lg z-10">
          <div className="relative z-10 p-10">
            <SendTokenForm sendTransaction={sendTransaction} />
          </div>
        </div>
      ) : (
        <div className="relative p-10 rounded-sm shadow-lg z-10">
          <p className="text-xl text-white">Please connect your wallet to send tokens.</p>
        </div>
      )}
    </main>
  );
};

export default Body;
