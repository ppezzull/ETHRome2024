"use client";

import { useRouter } from "next/navigation";
import Confirmation from "../alert-dialogs/confirmation";
import { Button } from "../ui/button";
import { Unplug } from "lucide-react";
import { useDisconnect } from "wagmi";

export default function DisconnectButton() {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleDisconnect = async () => {
    disconnect();
    router.replace("/");
  };

  return (
    <Confirmation onConfirm={handleDisconnect}>
      <div className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
        <Unplug className="mr-2 h-4 w-4" />
        Disconnect from Wallet
      </div>
    </Confirmation>
  );
}
