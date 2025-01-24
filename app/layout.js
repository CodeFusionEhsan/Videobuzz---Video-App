import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { SessionProvider } from "next-auth/react"
import SessionWrapper from "./sessionwrapper";
import Footer from "../components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Videobuzz - Video App",
  description: "A place to chill",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </SessionWrapper>
    </html>
  );
}
