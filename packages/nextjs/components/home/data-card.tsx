"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { useiExec } from "@/hooks/iExec/useiExec";
import { ProtectedData } from "@iexec/dataprotector/dist/src/lib/types";
import moment from "moment";
import { toast } from "sonner";

export default function DataCard({ item }: { item: ProtectedData }) {
  const iExec = useiExec();
  const [loadingData, setLoadingData] = useState(false);

  const decryptData = async () => {
    setLoadingData(true);
    const { data, error } = await iExec.decryptData(item.address);

    if (error || !data) {
      toast.message(error?.message || "Error decrypting data");
      setLoadingData(false);
      return;
    }

    const decoder = new TextDecoder("utf-8");
    const textContent = decoder.decode(data);

    console.log(textContent);

    setLoadingData(false);
    toast.message("Data decrypted successfully!");
  };

  return (
    <Card
      onClick={decryptData}
      className={`${
        loadingData ? "opacity-40 pointer-events-none" : ""
      } bg-secondary cursor-pointer overflow-hidden text-lg font-medium tracking-tighter hover:ring-secondary transform-gpu ring-offset-secondary transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2 w-full h-32 flex flex-col p-2 justify-between`}
    >
      <div className="w-full flex justify-between">
        <p className="text-base truncate">{item.name}</p>
        <p className="text-sm">{moment(item.creationTimestamp).format("DD/MM/YYYY")}</p>
      </div>
      <div className="w-full text-sm truncate">{item.owner}</div>
    </Card>
  );
}
