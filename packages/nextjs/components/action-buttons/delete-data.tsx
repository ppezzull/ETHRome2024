import Confirmation from "../alert-dialogs/confirmation";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteData() {
  const handleDelete = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  return (
    <Confirmation onConfirm={handleDelete}>
      {/*  <Button variant={"destructive"}>
        <Trash2 size={16} />
      </Button> */}
    </Confirmation>
  );
}
