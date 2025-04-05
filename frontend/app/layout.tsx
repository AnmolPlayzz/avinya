import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/library/navbar/navbar";

const roboto = Roboto({
  style: ["normal","italic"],
  subsets: ["latin"],
  weight: "variable"
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
