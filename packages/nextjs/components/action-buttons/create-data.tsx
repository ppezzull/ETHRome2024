import { Button } from "../ui/button";

export default function CreateData({ data }: { data: string | null }) {
  const handleSave = async () => {
    if (!data) return;
    if (typeof window != undefined) return;

    if (!window.ethereum) {
      toast("Missing Ethereum provider. Please install Metamask.");
      return;
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
