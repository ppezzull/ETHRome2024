import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import NoDataFound from "@/components/assets/svgs/no-data-found.svg";
import { useAddData } from "@/context/add-data-sheet-context";
import { PlusCircle } from "lucide-react";

export default function Dashboard() {
  const demo: any[] = [];

  const { setOpen } = useAddData();

  return (
    <div className="flex flex-col h-svh py-6 pr-6">
      <Card className="p-4 h-full flex flex-col">
        <div className="w-full flex justify-between">
          <span className="text-3xl font-bold">Dashboard</span>
          {demo.length > 0 && (
            <Button onClick={() => setOpen(true)} variant={"default"} className="flex gap-2" size={"sm"}>
              <PlusCircle className="h-4 w-4" />
              Aggiungi dato
            </Button>
          )}
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
              <Image src={NoDataFound} alt="not found" height={130} width={130} />
              <span>Non hai ancora aggiunto nessun dato</span>
              <Button onClick={() => setOpen(true)} variant={"default"} className="flex gap-2" size={"sm"}>
                <PlusCircle className="h-4 w-4" />
                Aggiungi dato
              </Button>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
