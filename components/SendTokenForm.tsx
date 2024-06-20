"use client"
import { useState, FormEvent } from 'react';

interface SendTokenFormProps {
  sendTransaction: (recipient: string, amount: number) => void;
}

const SendTokenForm: React.FC<SendTokenFormProps> = ({ sendTransaction }) => {
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendTransaction(recipient, amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700">El-salvador dogs Address:</label>
        <input
          type="text"
          placeholder='49WAVdmMCdcgFL8Zp6ZrT8htYUj4H8fKV9mC6aeTHRq9'
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Send Tokens
      </button>
    </form>
  );
};

export default SendTokenForm;
