"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { createArrayBufferFromFile } from "@/utils/iExec/utils";
import { IExecDataProtector } from "@iexec/dataprotector";
import { toast } from "sonner";
import { useAccount, useSwitchChain } from "wagmi";

const BELLECOUR_CHAIN_ID = 134;

export default function CreateData({ data, dataName }: { data: string | null; dataName: string | null }) {
  const [loading, setLoading] = useState(false);
  const { switchChain, chains, switchChainAsync } = useSwitchChain();

  const createFile = async () => {
    if (!data || !dataName) return;
    var blob = new Blob([data], { type: "text/plain" });
    var file = new File([blob], dataName, { type: "text/plain" });

    if (file.size > 500000) {
      toast("File size is too large. Please upload a file smaller than 500KB.");
      return { file: null };
    }

    return { file };
  };

  const handleSave = async () => {
    console.log(data, dataName);
    if (!data || !dataName) {
      toast("Missing document or document name.");
      return;
    }
    if (typeof window === undefined) return;

    if (!window.ethereum) {
      toast("Missing Ethereum provider. Please install Metamask.");
      return;
    }
    try {
      setLoading(true);
      const file = await createFile();

      if (!file?.file) return;

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // @ ts-ignore
      const userAddress = accounts?.[0];

      if (!userAddress) {
        toast("Missing user address?");
        setLoading(false);
        return;
      }

      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      if (Number(chainId) !== BELLECOUR_CHAIN_ID) {
        toast("Invalid network, re-try on Bellecour network.");
        switchChain({ chainId: BELLECOUR_CHAIN_ID });

        setLoading(false);
        return;
      }

      const bufferFile = await createArrayBufferFromFile(file.file);
      const dataProtector = new IExecDataProtector(window.ethereum);
      await dataProtector.protectData({
        name: dataName,
        data: {
          file: bufferFile,
        },
      });

      console.log("DONE");
    } catch (e) {}
  };

  return <Button onClick={handleSave}>{loading ? "Saving..." : "Save"}</Button>;
}
