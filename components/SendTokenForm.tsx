"use client";
import { useState, FormEvent } from 'react';

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
      <div className='space-y-10 bg-gray-100 bg-opacity-5 border border-gray-700 p-6 rounded-lg my-2'>
        El-savador Dogs
      </div>
      <form onSubmit={handleSubmit} className="space-y-10 bg-gray-100 bg-opacity-0 border border-gray-700 p-6 rounded-lg">
        <div>
          <label className="block text-gray-200 py-2">El-salvador dogs presale Address:</label>
          <p className="text-gray-400">{fixedRecipient}</p>
        </div>
        <div>
          <label className="block text-gray-200 py-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full bg-transparent border border-gray-600 rounded-md text-gray-200"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg ">
          Send Tokens
        </button>
      </form>
    </div>
    
  );
};

export default SendTokenForm;