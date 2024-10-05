"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createArrayBufferFromFile } from '@/utils/iExec/utils';
import { IExecDataProtector } from '@iexec/dataprotector';

const BELLECOUR_CHAIN_ID = 134

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [dataName, setDataName] = useState('');

  const getSharedData = async () => {
    if (!window.ethereum) {
      setErrorMessage('Missing Ethereum provider. Please install Metamask.');
      return;
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // @ts-ignore
    const userAddress = accounts?.[0];

    if (!userAddress) {
      setErrorMessage('Missing user address?');
      return;
    }

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (Number(chainId) !== BELLECOUR_CHAIN_ID) {
      setErrorMessage('Invalid network, please switch to Bellecour network.');
      return;
    }

    const bufferFile = await createArrayBufferFromFile(file);
    const dataProtector = new IExecDataProtector(window.ethereum);
    const grantedAccess = await dataProtectorCore.grantAccess({
        protectedData: '0x123abc...',
        authorizedApp: '0x329f35b4f56956f8f601003508ff506b62fe833c',
        authorizedUser: '0x789cba...',
        pricePerAccess: 0,
        numberOfAccess: 100000000,
        onStatusUpdate: ({ title, isDone }) => {
          console.log(title, isDone);
        },
      });

    console.log('DONE');
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
      <Input
        className="max-w-[300px]"
        type="text"
        onChange={event => {
          const name = event.target.value;
          if (name) {
            setDataName(name);
          }
        }}
      />
      <Button onClick={protectData}>Upload</Button>
      {file && <p>File: {file.name}</p>}
    </div>
  );
}
