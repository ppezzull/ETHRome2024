"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BELLECOUR_CHAIN_ID } from "@/utils/iExec/utils";
import { IExecDataProtector } from "@iexec/dataprotector";

export default function GetProtectedData() {
  const [protectedDatas, setProtectedDatas] = useState([]); // State to hold protected data
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getProtectedData = async () => {
    try {
      if (!window.ethereum) {
        setErrorMessage("Missing Ethereum provider. Please install Metamask.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const userAddress = accounts?.[0];

      if (!userAddress) {
        setErrorMessage("Missing user address?");
        return;
      }

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (Number(chainId) !== BELLECOUR_CHAIN_ID) {
        setErrorMessage("Invalid network, please switch to Bellecour network.");
        return;
      }
      console.log("before init ");

      const dataProtectorCore = new IExecDataProtector(window.ethereum);

      // Fetch the protected data owned by the user
      const protectedDataList = await (dataProtectorCore as any)?.core.getProtectedData({
        owner: userAddress,
      });

      console.log("test ", protectedDataList);
      setProtectedDatas(protectedDataList); // Store the fetched protected data in state
    } catch (error) {
      console.error("Error fetching protected data:", error);
      setErrorMessage("Failed to retrieve protected data.");
    }
  };

  // Fetch the protected data when the component mounts
  useEffect(() => {
    getProtectedData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">Protected Datasets</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Map through protectedDatas and display them */}
      {protectedDatas.length > 0 ? (
        <div className="w-full max-w-[600px] flex flex-col gap-4">
          {protectedDatas.map((data, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-md shadow-md">
              <p>
                <strong>Address:</strong> {data.address}
              </p>
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Owner:</strong> {data.owner}
              </p>
              <p>
                <strong>Multiaddr:</strong> {data.multiaddr}
              </p>
              <p>
                <strong>Creation Timestamp:</strong> {new Date(data.creationTimestamp * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No protected datasets found.</p>
      )}

      {/* Optional manual refresh button */}
      <Button onClick={getProtectedData}>Refresh Data</Button>
    </div>
  );
}
