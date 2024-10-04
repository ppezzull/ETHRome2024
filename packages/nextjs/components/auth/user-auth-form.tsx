"use client";

import * as React from "react";
import ConnectButtonCustom from "./connect-button";
import DisconnectButton from "./disconnect-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GlobeLock, Loader2 } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  //   const [isLoading, setIsLoading] = React.useState<boolean>(false);

  //   async function onSubmit(event: React.SyntheticEvent) {
  //     event.preventDefault();
  //     setIsLoading(true);

  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);
  //   }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <ConnectButtonCustom />
      <DisconnectButton />
    </div>
  );
}
