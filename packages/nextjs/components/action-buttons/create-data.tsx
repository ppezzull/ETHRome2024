"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useAddData } from "@/context/add-data-sheet-context";
import { useiExec } from "@/hooks/iExec/useiExec";
import { toast } from "sonner";

export default function CreateData({ data, dataName }: { data: string | null; dataName: string | null }) {
  const [loading, setLoading] = useState(false);
  const { setOpen } = useAddData();
  const iExec = useiExec();

  const handleSave = async () => {
    setLoading(true);
    if (!data || !dataName) return;
    const { data: dataCreated, error } = await iExec.encryptAndPushData(data, dataName);
    if (error || !dataCreated) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Data saved and encrypted");
    setOpen(false);
  };

  return (
    <Button onClick={handleSave} disabled={loading}>
      {loading ? "Waiting..." : "Save and crypt data"}
    </Button>
  );
}
