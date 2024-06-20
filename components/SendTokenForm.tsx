"use client";
import { useState, FormEvent } from 'react';
import Image from 'next/image'; // Import Image from next/image
import { FaTelegramPlane } from 'react-icons/fa';

interface SendTokenFormProps {
  sendTransaction: (recipient: string, amount: number) => void;
}

const SendTokenForm: React.FC<SendTokenFormProps> = ({ sendTransaction }) => {
  const fixedRecipient = '49WAVdmMCdcgFL8Zp6ZrT8htYUj4H8fKV9mC6aeTHRq9';
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendTransaction(fixedRecipient, amount);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-10 bg-gray-100 bg-opacity-0 border border-gray-700 p-6 rounded-lg">
        <div>
          <label className="block text-lg text-gray-200 py-2">El-salvador Dogs presale Address:</label>
          <p className="text-gray-400">{fixedRecipient}</p>
        </div>
        <div>
          <label className="block text-lg text-gray-200 py-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full bg-transparent border border-gray-600 rounded-md text-gray-200"
          />
        </div>
        <button type="submit" className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg">
          Send Tokens
        </button>
      </form>
      <div className='flex items-center space-x-4 bg-gray-100 bg-opacity-0 border border-gray-700 p-6 rounded-lg my-5'>
        <Image src="/assets/logo.jpg" alt="El-salvador Dogs Logo" width={70} height={70} />
        <div className='flex flex-col'>
          <span className='text-gray-200'>El-salvador Dogs</span>
          <a href="https://t.me/Elsalvadordogss" target="_blank" rel="noopener noreferrer" className='flex items-center space-x-2 mt-2 text-blue-500 hover:underline'>
            <FaTelegramPlane />
            <span>Join our Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SendTokenForm;
