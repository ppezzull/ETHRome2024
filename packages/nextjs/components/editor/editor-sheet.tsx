import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Editor from "./editor";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAddData } from "@/context/add-data-sheet-context";

export default function AddNoteEditor() {
  const { open, setOpen } = useAddData();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <Input
            id="filename"
            placeholder="Untitled"
            className="w-3/4 border-none outline-none font-bold ring-offset-0 text-3xl focus-visible:ring-0 bg-transparent focus-visible:ring-offset-0 caret-transparent"
          />
        </SheetHeader>
        <Editor />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
