"use client";
import { useState, FormEvent } from 'react';
import Image from 'next/image'; // Import Image from next/image
import { FaTelegramPlane } from 'react-icons/fa';

interface SendTokenFormProps {
  sendTransaction: (recipient: string, amount: number) => void;
}

const SendTokenForm: React.FC<SendTokenFormProps> = ({ sendTransaction }) => {
  const fixedRecipient = '49WAVdmMCdcgFL8Zp6ZrT8htYUj4H8fKV9mC6aeTHRq9';
  const [amount, setAmount] = useState<number>(0.01);

  const handleIncrement = () => {
    setAmount((prevAmount) => prevAmount + 0.1);
  };

  const handleDecrement = () => {
    setAmount((prevAmount) => Math.max(0.001, prevAmount - 0.1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0.01) {
      setAmount(value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendTransaction(fixedRecipient, amount);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 bg-opacity-0 border border-gray-700 p-4 sm:p-6 rounded-lg">
        <div>
          <label className="block text-lg text-gray-200 py-2">El-salvador Dogs presale Address:</label>
          <p className="text-gray-400 break-words">{fixedRecipient}</p>
        </div>
        <div>
          <label className="block text-lg text-gray-200 py-2">Amount:</label>
          <div className="flex items-center space-x-2">
            <button type="button" onClick={handleDecrement} className="px-4 py-2 bg-red-500 text-white rounded-lg">-</button>
            <input
              type="number"
              step="0.001"
              min="0.001"
              value={amount}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full bg-transparent border border-gray-600 rounded-md text-gray-200"
            />
            <button type="button" onClick={handleIncrement} className="px-4 py-2 bg-green-500 text-white rounded-lg">+</button>
          </div>
        </div>
        <button type="submit" className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg">
          Send Tokens
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
    </div>
  );
};

export default SendTokenForm;