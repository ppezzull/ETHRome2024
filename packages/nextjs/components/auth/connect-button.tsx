"use client";

import { Button } from "../ui/button";
import { useTargetNetwork } from "@/hooks/scaffold-eth";
import { getBlockExplorerAddressLink } from "@/utils/scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GlobeLock } from "lucide-react";

export default function ConnectButtonCustom() {
  const { targetNetwork } = useTargetNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork, account.address)
          : undefined;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <Button variant="default" type="button" onClick={openConnectModal} /* disabled={isLoading} */>
                    <GlobeLock className="mr-2 h-4 w-4" /> Connect to Wallet
                  </Button>
                );
              }

              //   if (chain.unsupported || chain.id !== targetNetwork.id) {
              //     return <WrongNetworkDropdown />;
              //   }

              return <></>;
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
