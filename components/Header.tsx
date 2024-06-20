'use client'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-gray-800 text-white">
      <h1 className="text-2xl">Solana Token Sender</h1>
      <WalletMultiButton />
    </header>
  );
};

export default Header;