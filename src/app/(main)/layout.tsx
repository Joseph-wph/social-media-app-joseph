"use client";

import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/navbar";
import BottomNavbar from "@/components/bottomNavbar";

const sfPro = localFont({
  src: [
    {
      path: "../../fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sfpro",
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sfPro.variable} antialiased`}>
      <Navbar />
      {children}
      <BottomNavbar />
    </div>
  );
}
