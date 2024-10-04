"use client";

import { useState } from "react";
import { Input } from "../ui/input";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col items-center gap-8">
      <Input
        className="max-w-[300px]"
        type="file"
        onChange={event => {
          const file = event.target.files?.[0];
          if (file) {
            setFile(file);
          }
        }}
      />
      {file && <p>File: {file.name}</p>}
    </div>
  );
}
