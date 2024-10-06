import { useEffect, useState } from "react";
import CreateData from "../action-buttons/create-data";
import { Input } from "../ui/input";
import Editor from "./editor";
import { Sheet, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { useAddData } from "@/context/add-data-sheet-context";
import { Expand, Minimize } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRightIcon as Arrow } from "@radix-ui/react-icons";

export default function AddNoteEditor() {
  const { open, setOpen, title, content, setTitle, setContent } = useAddData();
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>("");
  const [filename, setFilename] = useState<string | null>(null);
  const [shereUser, setShereUser] = useState<string[]>([]);
  const [newUser, setNewUser] = useState<string>("");

  const changeSize = () => {
    if (loading) return;
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (!open) {
      setFilename("");
      setData("");
      setTitle("");
      setContent("");
    }
  }, [open]);


  // Funzione per gestire l'invio dell'ultimo input
  const handleUserInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newUser.trim() !== "") {
      setShereUser(prevUsers => [...prevUsers || [], newUser.trim()]);
      setNewUser(''); // Reset dell'input
    }
  };

  function handerSubmit(): void {

  }

  return (
    <Sheet open={open} onOpenChange={!loading || title != "" ? setOpen : () => {}}>
      <SheetContent className={`w-full transition-all ${collapsed ? "sm:w-[540px]" : "w-full"} flex flex-col`}>
        {collapsed ? (
          <Expand onClick={changeSize} size={20} className="cursor-pointer" />
        ) : (
          <Minimize onClick={changeSize} size={20} className="cursor-pointer" />
        )}
        <SheetHeader>
          <Input
            disabled={loading || title != ""}
            defaultValue={title}
            onChange={event => setFilename(event.target.value)}
            id="filename"
            placeholder="Untitled"
            className="w-3/4 border-none outline-none font-bold ring-offset-0 text-3xl focus-visible:ring-0 bg-transparent focus-visible:ring-offset-0 caret-transparent"
          />
        </SheetHeader>
        <Editor
          readOnly={loading || title != ""}
          defaultValue={""}
          value={content ? content : data}
          onChange={setData}
        />
        <SheetFooter className={`flex w-full ${!title ? "justify-end" : ""}`}>
          {!title && !content && (
            <CreateData loading={loading} setLoading={setLoading} data={data} dataName={filename} />
          )}
          {title && content && (
            <Popover>
              <PopoverTrigger>
                <Button
                  className="animate-pulse group relative gap-2 overflow-hidden text-lg font-medium tracking-tighter hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2"
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
                  {"Share"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {shereUser?.map((user, index) => (
                  <div key={index} className="truncate max-w-xs">
                    <Badge
                      className="text-base max-w-xs mb-2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "250px" // Limita la larghezza massima del testo nel badge
                      }}
                    >
                      {user}
                    </Badge>
                  </div>
                ))}
                <label className="text-sm mb-4">Add user :</label>
                <br />
                <div className="flex gap-2">
                  <Input
                    value={newUser}
                    onChange={(event) => setNewUser(event.target.value)}
                    onKeyDown={handleUserInputKeyPress}
                    placeholder="Add user and press Enter"
                  />
                  <Button onClick={() => handerSubmit()}>
                    <Arrow />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
