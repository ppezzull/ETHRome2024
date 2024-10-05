"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useWalletClient } from "wagmi";

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

  return <>{isConnected && <div className="py-6">{children}</div>}</>;
}
