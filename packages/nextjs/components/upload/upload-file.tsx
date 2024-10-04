"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createArrayBufferFromFile } from '../utils/';

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data: {
      email?: string;
      file?: Uint8Array;
    } = {};
    let bufferFile: Uint8Array;
    switch (dataType) {
      case 'email':
        data.email = email;
        break;
      case 'file':
        if (!file) {
          toast({
            variant: 'danger',
            title: 'Please upload a file.',
          });
          return;
        }
        bufferFile = await createArrayBufferFromFile(file);
        data.file = bufferFile;
        break;
    }

    if (
      !dataType ||
      !name ||
      (dataType === 'email' && !email.trim()) ||
      (dataType === 'file' && !file)
    ) {
      toast({
        variant: 'danger',
        title: 'Please fill in all required fields.',
      });
      return;
    }

    if (dataType === 'email' && !!email && !isValidEmail) {
      toast({
        variant: 'danger',
        title: 'Please enter a valid email address',
      });
      return;
    }

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

      setTimeout(() => {
        setShowBackToListLink(true);
      }, 1500);
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
      <Button onClick={handleSubmit}>Upload</Button>
      {file && <p>File: {file.name}</p>}
    </div>
  );
}
