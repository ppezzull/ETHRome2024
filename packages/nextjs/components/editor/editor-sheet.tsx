import { useState } from "react";
import CreateData from "../action-buttons/create-data";
import DeleteData from "../action-buttons/delete-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Editor from "./editor";
import { Sheet, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { useAddData } from "@/context/add-data-sheet-context";
import { Share, Trash2 } from "lucide-react";

export default function AddNoteEditor() {
  const { open, setOpen } = useAddData();
  const [data, setData] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <Input
            onChange={event => setFilename(event.target.value)}
            id="filename"
            placeholder="Untitled"
            className="w-3/4 border-none outline-none font-bold ring-offset-0 text-3xl focus-visible:ring-0 bg-transparent focus-visible:ring-offset-0 caret-transparent"
          />
        </SheetHeader>
        <Editor defaultValue={data} onChange={setData} />
        <SheetFooter className="flex w-full justify-between">
          <div className="flex gap-2">
            <DeleteData />
          </div>
          <CreateData data={data} dataName={filename} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
