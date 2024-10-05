import { Button } from "../ui/button";

export default function CreateData({ onSave }: { onSave: () => void }) {
  const handleSave = () => {
    onSave();
  };
  return <Button onClick={handleSave}>Save</Button>;
}
