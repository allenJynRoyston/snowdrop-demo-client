import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@component/Header"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snowdrop Test App",
  description: "Built by Jynn Royston",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen m-0 flex flex-col ${inter.className}`} >
        <Header />
        <div className="flex-1 flex flex-col p-10 gap-10">
            {children}
        </div>
      </body>      
    </html>
  );
}
