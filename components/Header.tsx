'use client'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-1  bg-black  text-white">
      <h1 className="text-xl">El-salvador Dogs</h1>
      <WalletMultiButton />
    </header>
  );
};

export default Header;