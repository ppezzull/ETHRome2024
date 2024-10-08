"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import MobileNav from "./mobile-nav";
import NoDataFound from "@/components/assets/svgs/no-data-found.svg";
import { useAddData } from "@/context/add-data-sheet-context";
import { useiExec } from "@/hooks/iExec/useiExec";
import { ProtectedData } from "@iexec/dataprotector/dist/src/lib/types";
import { Plus, PlusCircle } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";
import DataCard from "./data-card";
import { Input } from "../ui/input";

export default function Dashboard() {
  const [protectedDatas, setProtectedDatas] = useState<ProtectedData[] | null>(null); // State to hold protected data
  const { setOpen, open } = useAddData();
  const iExec = useiExec();

  const getProtectedData = async () => {
    const { data, error } = await iExec.getMyProtectedData();
    if (error || !data) {
      toast.message(error?.message || "Error fetching protected data");
      return;
    } else {
      setProtectedDatas(data);
    }
  };

  const [filter, setFilter] = useState<string>(''); // Rename useFilter to setFilter for clarity

  useEffect(() => {
    getProtectedData();
  }, []);

  useEffect(() => {
    if (!open) getProtectedData();
  }, [open]);

  return (
    <div className="flex flex-col h-svh py-6 p-4 md:pr-6">
      <MobileNav />
      <Card className={`p-4 h-full flex flex-col`}>
        {protectedDatas && (
          <>
            <div className="w-full flex flex-row mb:flex-col justify-between">
              <span className="text-3xl font-bold">My data</span>
              <Input
                onChange={(e) => setFilter(e.target.value)} // Change the filter value
                id="filter"
                placeholder="Filtra per nome"
                className="mb:w-full w-[20%] rounded-full"
              />
            </div>
            <div className="h-full flex w-full flex-col mt-5">
              {protectedDatas.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <Card
                    onClick={() => setOpen(true)}
                    className="hover:bg-secondary border-dashed cursor-pointer justify-center items-center overflow-hidden text-lg font-medium tracking-tighter hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2 w-full h-32 flex flex-col p-2"
                  >
                    <Plus size={50} strokeWidth={1} className="opacity-20" />
                  </Card>

                  {/* Apply the filter */}
                  {protectedDatas
                    .filter((item: any) => item.name && item.name.toLowerCase().includes(filter.toLowerCase())) // Filter by name
                    .map((item, index) => (
                      <DataCard key={index} item={item} />
                    ))}
                </div>
              ) : protectedDatas.length === 0 ? (
                <div className="flex-1 w-full flex justify-center items-center flex-col gap-6">
                  <Image src={NoDataFound} alt="not found" height={130} width={130} />
                  <span>Non hai ancora aggiunto nessun dato</span>
                  <Button onClick={() => setOpen(true)} variant={"default"} className="flex gap-2" size={"sm"}>
                    <PlusCircle className="h-4 w-4" />
                    Aggiungi dato
                  </Button>
                </div>
              ) : null}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
