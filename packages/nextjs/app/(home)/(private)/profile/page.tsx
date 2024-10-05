"use client";

import QRCodeDialog from "@/components/profile/QRCode";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useWatchBalance } from "@/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export default function Profile() {
  const { address } = useAccount();
  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
  });

  return (
    <>
      <Card className="p-4 h-svh">
        <span className="text-3xl font-bold">Profile</span>
        <Card className="p-4 mt-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <QRCodeDialog address={address}>
              <Avatar className="w-16 h-16">
                <AvatarFallback>{address && address.slice(0, 5)}</AvatarFallback>
              </Avatar>
            </QRCodeDialog>
            <span className="text-lg">{address}</span>
          </div>
          <span className="text-2xl font-bold">
            {balance?.value || 0} {balance?.symbol}
          </span>
        </Card>
      </Card>
    </>
  );
}
