import SendTokenForm from './SendTokenForm';

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  return (
    <main className="flex flex-col items-center justify-center p-10 bg-gray-100 min-h-screen">
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