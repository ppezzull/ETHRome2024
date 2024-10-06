import { useState } from "react";
import CreateData from "../action-buttons/create-data";
import { Input } from "../ui/input";
import Editor from "./editor";
import { Sheet, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { useAddData } from "@/context/add-data-sheet-context";
import { Expand, Minimize } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

export default function AddNoteEditor() {
  const { open, setOpen,  } = useAddData();
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  setOpen(true);

  return (
    <Sheet open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <SheetContent className={`w-full transition-all ${collapsed ? "sm:w-[540px]" : "w-full"} flex flex-col`}>
        {collapsed ? (
          <Expand onClick={() => setCollapsed(!collapsed)} size={20} className="cursor-pointer" />
        ) : (
          <Minimize onClick={() => setCollapsed(!collapsed)} size={20} className="cursor-pointer" />
        )}
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
        <SheetFooter className="flex w-full">
          <Popover>
            <Button >
              <PopoverTrigger>Shere</PopoverTrigger>
            </Button>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
