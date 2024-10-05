"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDialog({
  address,
  children,
}: {
  address: string | undefined;
  children: React.ReactNode;
}) {
  if (!address) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Address QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex w-full justify-center p-4">
          <QRCodeSVG
            fgColor="white"
            bgColor="#110d27"
            value={"https://explorer.iex.ec/bellecour/address/" + address}
            size={256}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
