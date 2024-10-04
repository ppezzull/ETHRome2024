"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    // console.log("file", file);
  };

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
      <Button onClick={uploadFile}>Upload</Button>
      {file && <p>File: {file.name}</p>}
    </div>
  );
}
