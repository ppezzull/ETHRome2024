"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/home/mobile-nav";
import { useAccount } from "wagmi";
import { useAccountEffect } from "wagmi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isSSR && !isConnected) {
      router.push("/auth/login");
    }
  }, [isSSR]);

  useAccountEffect({
    onConnect(data) {
      console.log("Connected!", data);
    },
    onDisconnect() {
      console.log("Disconnected!");
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 3000);
  }, []);

  return (
    <>
      {isConnected && (
        <div className="flex flex-col h-svh py-6 px-4 md:pr-6">
          <MobileNav />
          {children}
        </div>
      )}
    </>
  );
}
