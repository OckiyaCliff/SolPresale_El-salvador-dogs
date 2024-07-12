"use client";
import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { FaTelegramPlane } from 'react-icons/fa';

interface SendTokenFormProps {
  sendTransaction: (recipient: string, amount: number) => void;
}

// sending to this address (milton black's dev wallet for solana)
// export const fixedRecipient = 'A15T4hgey4bEnTrQG14RBDvB9J3EJZ1JD4JcCSHsjSUx';
// export const fixedRecipient = '9RHBPVPahbQmTjrE1Wy9uhTRoV918xjvpPTcEvCFicJ3';
// el-dogs mainnet wallet add
export const fixedRecipient = 'DDRCQBWg58zD67b5moX7Vqdhk4r65jsm3mVtZr75eFmC'; 
// my sol testing wallet
// export const fixedRecipient = 'A15T4hgey4bEnTrQG14RBDvB9J3EJZ1JD4JcCSHsjSUx'; 


const SendTokenForm: React.FC<SendTokenFormProps> = ({ sendTransaction }) => {
  // original el-dogs wallet "mainnet"
  const [amount, setAmount] = useState<number>(0.75);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleIncrement = () => {
    setAmount((prevAmount) => prevAmount + 0.75);
  };

  const handleDecrement = () => {
    setAmount((prevAmount) => Math.max(0.75, prevAmount - 0.75));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0.75) {
      setAmount(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
     await sendTransaction(fixedRecipient, amount);
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Transaction failed");
    }
  };

  const handleModalClose = () => {
    setShowSuccess(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 bg-opacity-0 border border-gray-700 p-4 sm:p-6 rounded-lg">
        <div>
          <label className="block text-lg text-gray-200 py-2">El-salvador Dogs Whitelist presale :</label>
          {/* <p className="text-gray-400 break-words">{fixedRecipient}</p> */}
        </div>
        <div>
          <label className="block text-lg text-gray-200 py-2">Amount:</label>
          <div className="flex items-center space-x-2">
            <button type="button" onClick={handleDecrement} className="px-4 py-2 bg-red-400 text-white rounded-lg">-</button>
            <input
              type="number"
              step="0.001"
              min="0.001"
              value={amount}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full bg-transparent border border-gray-600 rounded-md text-gray-200"
            />
            <button type="button" onClick={handleIncrement} className="px-4 py-2 bg-green-400 text-white rounded-lg">+</button>
          </div>
        </div>
        <button type="submit" className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg">
          Buy 
        </button>
      </form>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-100 bg-opacity-0 border border-gray-700 p-4 sm:p-6 rounded-lg my-5">
        <Image src="/assets/logo.jpg" alt="El-salvador Dogs Logo" width={70} height={70} />
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-gray-200">El-salvador Dogs</span>
          <a href="https://t.me/Elsalvadordogss" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 mt-2 text-blue-500 hover:underline">
            <FaTelegramPlane />
            <span>Join our Telegram</span>
          </a>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm bg-opacity-70 bg-gray-900">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-800">Transaction successful!</p>
            <p className="text-gray-600">You have sent {amount} SOL.</p>
            <button onClick={handleModalClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendTokenForm;