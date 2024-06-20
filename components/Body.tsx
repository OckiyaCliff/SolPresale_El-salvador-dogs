import SendTokenForm from './SendTokenForm';
import { Timer } from './Timer';

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  return (
    <main className="flex flex-col items-center justify-center p-10 bg-gray-100 min-h-screen bg-gradient-to-l sm:bg-gradient-to-t from-[#88adf1] to-[#374b9c]">
      {isWalletConnected ? (
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <SendTokenForm sendTransaction={sendTransaction} />
        </div>
      ) : (
        <Timer expiryTimestamp={time}/>
      )}
    </main>
  );
};

export default Body;