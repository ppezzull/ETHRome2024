import Image from "next/image";
import ShareSVG from "@/components/assets/svgs/share.svg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function Shared() {
  const demo: any[] = [];

  return (
    <Card className="p-4 h-svh flex flex-col">
      <div className="w-full flex justify-between">
        <span className="text-3xl font-bold">SharedVault</span>
      </div>
      <div className="h-full flex w-full flex-col mt-5">
        {demo.length > 0 ? (
          demo.map((item, index) => (
            <div key={index} className="flex flex-col w-full">
              <div className="flex justify-around">
                <span className="text-lg">Description</span>
                <span className="text-lg">Amount</span>
                <span className="text-lg">Description</span>
              </div>
            </div>
          ))
        ) : demo.length === 0 ? (
          <div className="flex-1 w-full flex justify-center items-center flex-col gap-6">
            <Image src={ShareSVG} alt="not found" height={630} width={160} />
            <span>Nessuno ha condiviso ancora nessun dato con te</span>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
