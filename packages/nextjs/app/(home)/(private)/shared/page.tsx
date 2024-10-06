"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ShareSVG from "@/components/assets/svgs/share.svg";
import { Card } from "@/components/ui/card";
import { useAddData } from "@/context/add-data-sheet-context";
import { useiExec } from "@/hooks/iExec/useiExec";
import { GrantedAccess } from "@iexec/dataprotector/dist/src/lib/types";
import { toast } from "sonner";

export default function Shared() {
  const [sharedData, setSharedData] = useState<GrantedAccess[] | null>(null);
  const { setOpen, open } = useAddData();
  const iExec = useiExec();

  const getGrantedAccess = async () => {
    const { data, error } = await iExec.getGrantedAccess();
    if (error || !data) {
      toast.message(error?.message || "Error fetching protected data");
      setSharedData([]);
      return;
    } else {
      setSharedData(data.grantedAccess);
      console.log(data);
    }
  };

  useEffect(() => {
    getGrantedAccess();
  }, []);

  useEffect(() => {
    if (!open) getGrantedAccess();
  }, [open]);

  return (
    <Card className="p-4 h-svh flex flex-col">
      <div className="w-full flex justify-between">
        <span className="text-3xl font-bold">Shared Data</span>
      </div>
      {sharedData && (
        <div className="h-full flex w-full flex-col mt-5">
          {sharedData.length > 0 ? (
            sharedData.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                <div className="flex justify-around">
                  <span className="text-lg">Description</span>
                  <span className="text-lg">Amount</span>
                  <span className="text-lg">Description</span>
                </div>
              </div>
            ))
          ) : sharedData.length === 0 ? (
            <div className="flex-1 w-full flex justify-center items-center flex-col gap-6">
              <Image src={ShareSVG} alt="not found" height={630} width={160} />
              <span>Nessuno ha condiviso ancora nessun dato con te</span>
            </div>
          ) : null}
        </div>
      )}
    </Card>
  );
}
