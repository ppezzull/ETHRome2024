import { Button } from "../ui/button";
import { Share } from "lucide-react";

export default function ShareData() {
  return (
    <Button variant={"secondary"} disabled>
      <Share size={16} />
    </Button>
  );
}
