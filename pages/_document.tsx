import { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
// import crypto from 'crypto';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Document.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps & { nonce: string }> => {
//   const initialProps = await ctx.defaultGetInitialProps(ctx);
//   const nonce = crypto.randomBytes(16).toString('base64');
//   return { ...initialProps, nonce };
// };