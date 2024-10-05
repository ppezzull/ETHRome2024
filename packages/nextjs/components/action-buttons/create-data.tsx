"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useAddData } from "@/context/add-data-sheet-context";
import { useiExec } from "@/hooks/iExec/useiExec";
import { toast } from "sonner";

export default function CreateData({
  data,
  dataName,
  loading,
  setLoading,
}: {
  data: string | null;
  dataName: string | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
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
    <Button
      onClick={handleSave}
      disabled={loading}
      className="animate-pulse group relative gap-2 overflow-hidden text-lg font-medium tracking-tighter hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2"
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
      {loading ? "Waiting..." : "Save and crypt data"}
    </Button>
  );
}
