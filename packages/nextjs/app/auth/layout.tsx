"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function AuthLayout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (isConnected && process.env.NODE_ENV != "development") router.replace("/");

  return <>{children}</>;
}
