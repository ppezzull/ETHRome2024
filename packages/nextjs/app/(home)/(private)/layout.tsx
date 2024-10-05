"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isSSR && !isConnected) {
      router.push("/auth/login");
    }
  }, [isSSR]);

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 3000);
  }, []);

  return <>{isConnected && <div className="flex flex-col h-svh py-6 pr-6">{children}</div>}</>;
}
