"use client";

import * as React from "react";
import DisconnectButton from "../auth/disconnect-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWatchBalance } from "@/hooks/scaffold-eth";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";

interface AccountSwitcherProps {
  isCollapsed?: boolean;
}

export function AccountSwitcher({ isCollapsed = false }: AccountSwitcherProps) {
  const { addresses, address } = useAccount();

  const [selectedAccount, setSelectedAccount] = React.useState<string>(address || "");

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 w-full mb-6",
          isCollapsed && "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account" className="flex items-center gap-2">
          {selectedAccount?.slice(0, 10)}...{selectedAccount?.slice(-6)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {addresses &&
          addresses.map(address => (
            <SelectItem key={address} value={address}>
              <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                {address}
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
