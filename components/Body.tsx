"use client";
import SendTokenForm from './SendTokenForm';

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  return (
    <main className="flex flex-col items-center justify-center bg-black p-10 min-h-screen">
      {isWalletConnected ? (
        <div className="relative p-10 rounded-sm shadow-lg">
          <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#940ebd] rounded-[100%] absolute z-1 top-[90%] left-[80%] translate-x-[-50%] translate-y-[-50%] blur-[200px]"></div>
          <div className="relative z-10 p-10">
            <SendTokenForm sendTransaction={sendTransaction} />
          </div>
        </div>
      ) : (
        <p className="text-xl text-white">Please connect your wallet to send tokens.</p>
      )}
    </main>
  );
};

export default Body;