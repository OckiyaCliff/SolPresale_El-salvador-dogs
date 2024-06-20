"use client"
import SendTokenForm from './SendTokenForm';

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  return (
    <main className="flex flex-col items-center justify-center border-orange-700 p-10  bg-opacity-10 min-h-screen">
      <div className="circlePosition w-[590px] h-[400p] bg-[#eb26fd] rounded-[100%] absolute z-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px]">
        hi
      </div>
      {isWalletConnected ? (
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <SendTokenForm sendTransaction={sendTransaction} />
        </div>
      ) : (
        <p className="text-xl">Please connect your wallet to send tokens.</p>
      )}
    </main>
  );
};

export default Body;