import './globals.css';
import Footer from '@app/components/Layout/Footer';
import Header from '@app/components/Layout/Header';
import { Aboreto, Roboto } from 'next/font/google';
/**
 * Using force dynamic so changes in business assets (e.g. services) are immediately reflected.
 * If you prefer having it reflected only after redeploy (not recommended) please remove it
 * **/
export const revalidate = 0;

const aboreto = Aboreto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-aboreto',
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '300'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${aboreto.variable} ${roboto.variable}`}>
      <head>
        <title>Beauvoir Villa</title>
        <meta name="description" content="Holiday villa in Boutenac-Touvent," />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-black">
        {process.env.NEXT_PUBLIC_WIX_CLIENT_ID ? (
          <>
            <Header />
            <div></div>
            <main className="min-h-[600px]">{children}</main>
            <div className="mt-10 sm:mt-20">
              <Footer />
            </div>
          </>
        ) : (
          <div className="min-h-[600px] max-w-5xl mx-auto p-5">
            Page not available. Please add an environment variable called
            NEXT_PUBLIC_WIX_CLIENT_ID, containing the client ID, to your
            deployment provider.
          </div>
        )}
      </body>
    </html>
  );
}
