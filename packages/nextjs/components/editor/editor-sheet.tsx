import { useState } from "react";
import CreateData from "../action-buttons/create-data";
import { Input } from "../ui/input";
import Editor from "./editor";
import { Sheet, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { useAddData } from "@/context/add-data-sheet-context";

export default function AddNoteEditor() {
  const { open, setOpen } = useAddData();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <Input
            disabled={loading}
            onChange={event => setFilename(event.target.value)}
            id="filename"
            placeholder="Untitled"
            className="w-3/4 border-none outline-none font-bold ring-offset-0 text-3xl focus-visible:ring-0 bg-transparent focus-visible:ring-offset-0 caret-transparent"
          />
        </SheetHeader>
        <Editor readOnly={loading} defaultValue={data} onChange={setData} />
        <SheetFooter className="flex w-full justify-end">
          <CreateData loading={loading} setLoading={setLoading} data={data} dataName={filename} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
