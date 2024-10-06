"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import NoDataFound from "@/components/assets/svgs/no-data-found.svg";
import { useAddData } from "@/context/add-data-sheet-context";
import { useiExec } from "@/hooks/iExec/useiExec";
// Import iExec DataProtector
import { BELLECOUR_CHAIN_ID, IEXEC_APP_ADDRESS } from "@/utils/iExec/utils";
import { IExecDataProtector, type ProcessProtectedDataResponse } from "@iexec/dataprotector";
import { ProtectedData } from "@iexec/dataprotector/dist/src/lib/types";
import { PlusCircle } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";

export default function DownloadData() {
  const iExec = useiExec();

  const handleGrantAccess = async () => {
    try {
      await iExec.grantAccess(
        "0x6e08e838cceca1a021ba166b1350af7e58b003f8",
        "0x0201b88bd9C39c5f89818D6aCCf16D6C4C1fb586",
      );
    } catch (error) {
      toast.message(error.message || "Failed to grant access.");
    }
  };

  const handleDownloadData = async (itemAddress: string) => {
    try {
      const decryptedData = await iExec.decryptData(itemAddress);
      // Process the decrypted data or initiate download...
      console.log(decryptedData.data);
      toast.message("Data decrypted and downloaded successfully!");
    } catch (error) {
      toast.message(error.message || "Failed to decrypt data.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div>Test grand and decrypt diocanneeeeee</div>
      <Button onClick={handleGrantAccess}>Grant Access</Button>
      {/* Button to download and decrypt data */}
      <Button onClick={() => handleDownloadData("0x0ede460912e4009381369a6eb140ebfdc623f2e4")}>Download</Button>
    </div>
  );
}
