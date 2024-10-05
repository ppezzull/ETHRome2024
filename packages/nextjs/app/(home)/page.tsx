"use client";

import dynamic from "next/dynamic";
import Dashboard from "@/components/home/dashboard";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

const LandingPage = dynamic(() => import("@/components/landing/landing-page"), {
  ssr: false, // This component will not be server-side rendered
});

export default function Home() {
  const { isConnected, isConnecting, isReconnecting } = useAccount();

  console.log({ isConnected, isConnecting, isReconnecting });

  if (isConnected) {
    return <Dashboard />;
  }

  return <LandingPage />;
}
