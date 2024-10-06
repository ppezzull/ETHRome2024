"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { useiExec } from "@/hooks/iExec/useiExec";
// import { createFileFromArrayBuffer } from "@/utils/iExec/utils";
import { ProtectedData } from "@iexec/dataprotector/dist/src/lib/types";
import moment from "moment";
import { toast } from "sonner";

export default function DataCard({ item }: { item: ProtectedData }) {
  const iExec = useiExec();
  const [loadingData, setLoadingData] = useState(false);

  const decryptData = async () => {
    const demo = iExec.get
    /* setLoadingData(true);
    const { data, error } = await iExec.consumeData(item.address);
    if (error || !data) {
      toast.message(error?.message || "Error decrypting data");
      setLoadingData(false);
      return;
    }
    setLoadingData(false);
    // Process the decrypted data or initiate download...

    const fileAsBlob = new Blob([data]);
    const url = window.URL.createObjectURL(fileAsBlob);

    // Crea un elemento <a> temporaneo per il download
    const a = document.createElement("a");
    a.href = url;
    a.download = "DEMOOOOO"; // Nome del file per il download
    document.body.appendChild(a);
    a.click();

    // Pulizia: rimuovi l'elemento <a> e rilascia l'URL del blob
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.message("Data decrypted successfully!"); */
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
