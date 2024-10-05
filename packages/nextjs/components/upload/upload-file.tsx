"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createArrayBufferFromFile } from '@/utils/iExec/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getDataProtectorClient } from '@/utils/iExec/dataProtectorClient.ts';

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    const data: {
      email?: string;
      file?: Uint8Array;
    } = {};
    let bufferFile: Uint8Array;

    if (!file) {
      console.log("Inserisci il file brutto cane");
      
      return;
    }
    bufferFile = await createArrayBufferFromFile(file);
    data.file = bufferFile;

    createProtectedDataMutation.mutate({ data, name });
  };

  const createProtectedDataMutation = useMutation({
    mutationKey: ['protectData'],
    mutationFn: async ({
      name,
      data,
    }: {
      name: string;
      data: {
        email?: string;
        file?: Uint8Array;
      };
    }) => {
      const { dataProtector } = await getDataProtectorClient();
      return dataProtector.protectData({ name, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProtectedData'] });

      setTimeout(() => {}, 1500);
    },
  });

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
      <Input
        className="max-w-[300px]"
        type="text"
        onChange={event => {
          const name = event.target.value;
          if (name) {
            setName(name);
          }
        }}
      />
      <Button onClick={handleSubmit}>Upload</Button>
      {file && <p>File: {file.name}</p>}
    </div>
  );
}
