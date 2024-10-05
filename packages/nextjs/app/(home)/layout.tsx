"use client";

import Sidebar from "@/components/home/sidebar";
import { useAccount } from "wagmi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();

  return (
    <div className="h-svh flex">
      {isConnected && <Sidebar />}
      <main className="w-full">{children}</main>
    </div>
  );
}
