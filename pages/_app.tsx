import '../styles/globals.css';
import { useEffect } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import type { AppProps } from 'next/app';
// import crypto from 'crypto';
// import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  // useEffect(() => {
  //   const nonce = crypto.randomBytes(16).toString("base64");
  //   let cspMetaTag = document.querySelector('meta[name="csp-nonce"]');
    
  //   if (!cspMetaTag) {
  //     cspMetaTag = document.createElement("meta");
  //     cspMetaTag.setAttribute("name", "csp-nonce");
  //     document.head.appendChild(cspMetaTag);
  //   }

  //   cspMetaTag.setAttribute("content", nonce);
  // }, []);

  // const nonce = typeof window !== "undefined" 
  //   ? document.querySelector('meta[name="csp-nonce"]')?.getAttribute("content") 
  //   : "";
  return (
    <>
    {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Security-Policy"
          content={`default-src 'self'; style-src 'self' 'nonce-${nonce}' 'unsafe-inline'; script-src 'self' 'nonce-${nonce}'; connect-src 'self' https://damp-holy-brook.solana-devnet.quiknode.pro/f347f0166319230ac62881b63cb3b904edcaeb1f/;`}
        />
      </Head> */}
      <Component {...pageProps} />
    </>
  );
};

export default App;
