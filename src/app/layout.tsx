import type { Metadata } from "next";
import { Instrument_Serif, Fragment_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Soup CLI — Post-Training on Your Own Hardware",
  description:
    "Fine-tune Llama-3.1-8B on a 4 GB laptop GPU with exact layer streaming. 23 methods, 167 recipes, all offline. Apache-2.0.",
  icons: {
    icon: "/sites/soup/home/seo/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${fragmentMono.variable} ${robotoFlex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFDFD] text-black">{children}</body>
    </html>
  );
}
