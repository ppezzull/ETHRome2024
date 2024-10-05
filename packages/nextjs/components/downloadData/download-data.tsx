"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IExecDataProtector, type ProcessProtectedDataResponse } from "@iexec/dataprotector"; // Import iExec DataProtector
import { BELLECOUR_CHAIN_ID, IEXEC_APP_ADDRESS } from "@/utils/iExec/utils";
import { useAddData } from "@/context/add-data-sheet-context";
import { useiExec } from "@/hooks/iExec/useiExec";
import { ProtectedData } from "@iexec/dataprotector/dist/src/lib/types";
import { PlusCircle } from "lucide-react";
import { Card } from "../ui/card";
import moment from "moment";
import { toast } from "sonner";
import NoDataFound from "@/components/assets/svgs/no-data-found.svg";



export default function DownloadData() {
  const iExec = useiExec();

  const handleGrantAccess = async () => {
    try {
      await iExec.grantAccess(
        "0x0ede460912e4009381369a6eb140ebfdc623f2e4", 
        "0xc2464095238be454aa5b138526779e2e7fb244af"
      );
    } catch (error) {
      toast.message(error.message || "Failed to grant access.");
    }
  };

  const handleDownloadData = async (itemAddress: string) => {
    try {
      const decryptedData = await iExec.decryptData(itemAddress);
      // Process the decrypted data or initiate download...
			console.log(decryptedData.data)
      toast.message("Data decrypted and downloaded successfully!");
    } catch (error) {
      toast.message(error.message || "Failed to decrypt data.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div>Test grand and decrypt diocanneeeeee</div>
      <Button
        onClick={handleGrantAccess}
      >
        Grant Access
      </Button>
      {/* Button to download and decrypt data */}
      <Button
        onClick={() => handleDownloadData("0x0ede460912e4009381369a6eb140ebfdc623f2e4")}
      >
        Download
      </Button>
    </div>
  );
}
