"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import logo from "../public/assets/logo.jpg"

const Header = () => {
  return (
    <header className="flex justify-between items-center p-3  bg-black  text-white ">
      <div className="flex items-center">
        <Image src={logo} alt="logo" className="rounded-full mr-1" width={25} height={25} />
        <h1 className="text-lg px-4  ">El-salvador Dogs</h1>
      </div>
      <WalletMultiButton />
    </header>
  );
};

export default Header;
