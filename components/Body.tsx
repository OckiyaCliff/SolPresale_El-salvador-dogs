"use client";
import { useEffect, useState } from 'react';
import moment from "moment";
import SendTokenForm from "./SendTokenForm";
import { Timer } from "./Timer";
import { useWallet } from '@solana/wallet-adapter-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WHITELISTED_WALLETS = [
  "63M3o4aRYNdRBSd2foqNWpmuwBwy6enXofiEYsg1MhrQ",
  "EVrHikJwztbwkffJFL3NEJ5cAXvM17sy9xMw1Ea5YXxn",
  "BV2YnrJpWTFnv4hMQ5byGmqf8TZNRrGrzLgKdzixnUFH",
  "Euft3UZLxrxDLBxzPB7MmuKcxoeWPRaJDKpSQiDxiaqp",
  "JteH15t9JFTaswwecC3Lt95UJ3hLcnb4pxQNLbAidUB",
  "5d7WEhPyW5HrT3MCnDJUrZ6VdUzUkj4woEA4KMGU2ovX",
  "2NtyfBRiAaoShUU9nBUYvkozpdxjuEr11j4MP4vYpNh1",
  "CreomCVxJHyV7dBxXTVf4B3QGPkvEjcMZPBUXQT31m94",
  "XFQgAfzjaao9Dt91jsPEv1orXdGCKvYaYRHMbsNmZY3",
  "EY37Px1GmtU4ff8arxPLsXTmSTic74aYJ4buMCwHyRNy",
  "EAy8LESX85CT1H2SDLu7U5JMJXMqr8TpPnJa369YwDyg",
  "9rq7xDuYWmGGCuenPhqHYHJXDg68SN94CBpwEBG4XzEP",
  "7DoaqRQByWiCqARVRUj5ePD6zqMGdSGuqZbs9uDs7Ukg",
  "597Mk5KPEEHiGUBkCP7bTgRWScPD8gquvPXijZCDkuPt",
  "GXEjeveZoxyKsxarjeVWS9oouvkd66RFx3xd1rYZwcu4",
  "B4u8tnAabjbFnEvQaQckdRH1KSXF9GcVakP1ihRYYKMU",
  "5uCXkiueAUdvPcFCPLrJeihW8qhihUN62KTLzK56TgNP",
  "94oTHY8BZyPy9V15ZiPMKwzSZYBc1Yz5q4xa3DGCtzmC",
  "AFSae984mX4Q6FGmR4m3hc5LqZgshx9HE7bvFa1TkNvq",
  "3Dw43rrUWKN1mEjiBZmb1TbyjKC7vWLwUsSMdGhVEwLB",
  "EuxLhQL9tiDLUVxJ4NP397wBqVUF9RUGuYag7Adt7w8Y",
  "FsucmegbCQJFUdYRwQhcPFQh1hrERRhRNNeR2NcLwsiF",
  "FFDgCRbyn1LCXd4JvwFTK8GyXExPFZzjUM2p4eTnJKvw",
  "4ouvEGSnQ2cyrmUYfi946LF26vnhujZBqhpCrUX7vm6X",
  "69DFFQg7vKYAqFEPGcwvswdp8Uwg5iCtjUT9dzxwGqP7",
  "5Ay5EBuffA5oEHxWBX9edo51ccLF9CB2gRbn7S9zYm5B",
  "BNa3c6GeWCEzBPeR5nBibGUhqSgGoXBFYuah1LRAjnvm",
  "DuuEuxnBLYtMVjMue828DPBerSs6onqQd6BTiAq2FMYi",
  "TFdtVpg2PDMzzzjrFcgxEYWepyNCnaJnm1BEjXeGQES",
  "cZ8Umc5sdx5iEoyCTnUH9Jcq6eJb65sn7LwtT6RvkYb",
  "q6irJoKDLMwYfr7jdpo25v3G8nMqchs5YUsgtKpaiw3",
  "FS3i5ZfvPPBBNH53tePcfTYANfqYz3N2zSiFLuSokDuh",
  "GsFQLH1B2DJ7NwFB7y79qrx5tEFSK61cjHfbExksHCGQ",
  "9mzecBPU5S3UDFJY9DTmjsVHuRuBRMZLiJbGxCWwPpx4",
  "39f11tZEpGAAjCz6Fod6atWanBDeVv3fB6SzeUSaqj3P",
  "9eRs9Tj8K7VrwHKjRKqDy8cwnLCXUYeAejesSVJ1Ttyv",
  "HKSxwGfpDooQnf5y9ejWLyLFudax1Gi4N2CfoRKZJBnY",
  "CMpUBy5xAyz9FUJPh3JEuPoggoayRMQ14TFjvEeTtt4m",
  "EFzfJZNH5rFZEWjRiKoNGCXLWQFbV9R1vhqCRbVBB3S3",
  "CRgCsfi8sPGjbPybvbjcSLjGFaQH5Hi9FGTzm7rVxdhL",
  "8K7aTpzquuq5M3jwfpVY5YG3zVm31om3qJ99FKCbozZg",
  "BucpejpWHqzHA25kW312GRF2ofGztVMNrGR2VJvHC1QA",
  "H9dCdb3xZBtTUi4Az5edswayhGjuczGRZXGFuPR82PKH",
  "FBb2P1kAg1radgCfr51wmtgqPErWejLQwkNxZDs6nYDT",
  "QiT5gzNWgSJ5cWQT37bxswCmZ5hPpkQB3yzomFzrxJ1",
  "9Xzh9w4sjGbmZmMq26EjxrfjzEMiH4QUYU7cSAAPnwgk",
  "5FJb1UehjZYd1f3BexaV8oKVx2T86zTFfBodvp2xFMZ7",
  "5aiibWLWTGcGEam2X5yYwCdmcmVt3znsHXrbPWqA4qBQ",
  "9g1KMoZhS98MPZhs2s43gKmz325M7YjNZVxy8xCW74B8",
  "8PC3rrJbR5wggYx3FH52SKVWJBLNnpaKCXcmLXnvUE3g",
  "9YvL5By5wipHKteM3hVMie4bgPannDryVb7xyG9vVPNR",
  "9yAQGvk5dThWMVRezhXqpy4hZYnxgYuFKhUzvwWfCt9a",
  "92us74KiMmF3Wt1MZWsQAEFFbPZHrSpNkkkzeREx5Dv5",
  "F1SENBd6gsx2NVisAgcrvBWc5Zm7EXsNkxXHUzQFG1Q6",
  "9mMaNwtWYEiTScJYL7Cp6LhWkVdteEsKZPjthGBaVwNC",
  "GR5jzR82LEg4YbYdQD8etEgTeCMZ9DE74ng2HKvAyiSb",
  "ATpngcBHmojEv1ZYTp82MXNuk6LsBGu1mp8UUTsvWvxJ",
  "3an1ohd8VSdPxJ64HtHpg6kC2iDiS9o3aPtTuiuLJgQh",
  "HZnJFvJQF6CSfQYqLSv6UbU1QhA11KFyiCmYuKqaohgZ",
  "3Tc7gYZbUJXugGY6EPcU7k45wmkTKgNzoC4qL7ovyPdQ",
  "CaubkV7YDNrDTWEijMyk2d8CHWEBgqXdrDCqLQodmP5Z",
  "AviNnTbvcMnAnxEz7pawqjHjVquPRJWyk8FsZvozcHNG",
  "FJDcC7buDKz4H2ffRECw8SStMYfBGaSr1oBDy9cce9hP",
  "4wVSPGQR3WGMtFkuMNCiFwaPKZkuSTUHiRjNF1JdBf43",
  "6T4HyQgkNqqz3R7aG2ThdwbPK2q7oXyxMxHneVmqUTCb",
  "ERByVJUC3zuCVzSVbJzcP1qmtFLLwm7GFdWqNgXuVvWw",
  "B1H5LaZzHDJnpqc2bsMFU7UE8tLeTyCcbRvE4KYipe18",
  "9NtknNVnvu8FMvwHfEZai8xEzT3P2jx5iASYjrSkzneS",
  "BreCK7WrENJWZvRzdfWJTXc3H4wBbH5vSZ8JqAhQTqKk",
  "AVYeLVA8g6WA78MYQAmHxUhhNc7uGG6gkMgZQfmtRtuJ",
  "8jZc9hKeC2XFBFVVMbYWZ3uLFAN6FwSCArr7mBEx9dGN",
  "5iZsXgL133qZrkVesRcQZQnh2yw6kWKd7i1f6ETsGoz6",
  "4NDyjuM2DP8p6QdY7fadRLYrSDKdMa2bjesxgp67rkC7",
  "3Tc7gYZbUJXugGY6EPcU7k45wmkTKgNzoC4qL7ovyPdQ",
  "A15T4hgey4bEnTrQG14RBDvB9J3EJZ1JD4JcCSHsjSUx",
  "9RHBPVPahbQmTjrE1Wy9uhTRoV918xjvpPTcEvCFicJ3"
];

const EXCLUSIVE_PERIOD_DAYS = 2;

interface BodyProps {
  sendTransaction: (recipient: string, amount: number) => void;
  isWalletConnected: boolean;
}

const Body: React.FC<BodyProps> = ({ sendTransaction, isWalletConnected }) => {
  const { publicKey, connected } = useWallet();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isWithinExclusivePeriod, setIsWithinExclusivePeriod] = useState(true);

  useEffect(() => {
    const exclusivePeriodEndDate = new Date();
    exclusivePeriodEndDate.setDate(exclusivePeriodEndDate.getDate() + EXCLUSIVE_PERIOD_DAYS);

    const now = new Date();
    setIsWithinExclusivePeriod(now <= exclusivePeriodEndDate);

    if (connected && publicKey) {
      if (WHITELISTED_WALLETS.includes(publicKey.toBase58())) {
        setIsWhitelisted(true);
      } else {
        toast.error("This wallet is not whitelisted. Please wait for the public presales.");
      }
    }
  }, [connected, publicKey]);

  const targetDate = moment("2024-06-25T20:00:00+01:00"); // 25th June 2024, 8:00 PM WAT
  const now = moment();
  const isCountdownEnded = now.isAfter(targetDate);
  const expiryTimestamp = new Date(targetDate.toISOString());

  return (
    <main className="flex flex-col items-center justify-center bg-black p-4 sm:p-10 min-h-screen relative">
      <div className="inset-0 circlePosition w-[300px] h-[200px] bg-[#c507ff] rounded-full absolute z-0 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 blur-[170px]"></div>
      {connected && (isWhitelisted || !isWithinExclusivePeriod) ? (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10 bg-opacity-75">
          <SendTokenForm sendTransaction={sendTransaction} />
        </div>
      ) : (
        <div className="relative p-6 sm:p-10 rounded-sm shadow-lg z-10 bg-opacity-75 flex flex-col items-center justify-center">
          {!isCountdownEnded ? (
            <>
              <Timer expiryTimestamp={expiryTimestamp} />
              <p className="text-xl text-white pt-5">
                Please connect your wallet to Buy.
              </p>
            </>
          ) : (
            <p className="text-xl text-white pt-5">
              Whitelist Presale Phase is Live!!!
            </p>
          )}
        </div>
      )}
      <ToastContainer />
    </main>
  );
};

export default Body;