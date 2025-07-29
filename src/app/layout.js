import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pealen Admin",
  description: "Admin page for pealen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: { width: "500", zIndex: 9999 },
          }}
        />

        {children}
      </body>
    </html>
  );
}
