import { Habibi } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import "./globals.css";

const habibi = Habibi({
  weight: "400", // Habibi only comes in weight 400
  subsets: ["latin"],
  variable: "--font-habibi",
});

const amsterdamSig = localFont({
  src: "../../public/fonts/AmsterdamSig.ttf",
  variable: "--amsterdam-sig",
});

const kingred = localFont({
  src: "../../public/fonts/kingred.otf",
  variable: "--kingred",
});

export const metadata = {
  title: "Newsletter Signup",
  description: "Sign up for our newsletter to stay updated",
  icons: {
    icon: "/img/logos/first.svg",
    shortcut: "/img/logos/first.svg",
    apple: "/img/logos/first.svg",
    other: {
      rel: "apple-touch-icon",
      url: "/img/logos/first.svg",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${habibi.variable} ${kingred.variable} ${amsterdamSig.variable} bg-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
