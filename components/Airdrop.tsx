'use client'
import Image from "next/image";

const Airdrop = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-purple-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <Image
            src="https://cryptologos.cc/logos/solana-sol-logo.png?v=018"
            alt="Solana Logo"
            className="mx-auto h-12 w-auto"
          />
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="network">
              Request Airdrop
            </label>
            <select
              className="block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              id="network"
            >
              <option value="devnet">devnet</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="walletAddress">
              Wallet Address
            </label>
            <input
              className="block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              type="text"
              id="walletAddress"
              placeholder="Wallet Address"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              className="block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              type="text"
              id="amount"
              placeholder="Amount"
            />
          </div>
          <button
            className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
            type="submit"
          >
            Confirm Airdrop
          </button>
        </form>
        <p className="mt-4 text-gray-400 text-sm text-center">
          Maximum of 2 requests per hour
        </p>
      </div>
    </div>
  );
};

export default Airdrop;
