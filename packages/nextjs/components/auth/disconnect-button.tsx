"use client";

import { Button } from "../ui/button";
import { Unplug } from "lucide-react";
import { useDisconnect } from "wagmi";

export default function DisconnectButton() {
  const { disconnect } = useDisconnect();

  return (
    <>
      <Button variant="default" type="button" onClick={() => disconnect()}>
        <Unplug className="mr-2 h-4 w-4" />
        Disconnect from Wallet
      </Button>
    </>
  );
}
