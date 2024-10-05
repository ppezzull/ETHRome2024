"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IExecDataProtector, type ProcessProtectedDataResponse } from "@iexec/dataprotector"; // Import iExec DataProtector
import { BELLECOUR_CHAIN_ID, IEXEC_APP_ADDRESS } from "@/utils/iExec/utils"

export default function DownloadData() {
  const [protectedDatas, setProtectedDatas] = useState<any[]>([]); // State to hold protected data
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

      const dataProtectorCore = new IExecDataProtector(window.ethereum);

      // Fetch the protected data owned by the user
      const protectedDataList = await dataProtectorCore.core.getProtectedData({
        owner: userAddress,
      });

      console.log("Fetched protected data: ", protectedDataList);
      setProtectedDatas(protectedDataList); // Store the fetched protected data in state
    } catch (error) {
      console.error("Error fetching protected data:", error);
      setErrorMessage("Failed to retrieve protected data.");
    }
  };

  // Function to download the specific data by passing its address
  const downloadData = async (dataAddress: string) => {
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

      const dataProtectorCore = new IExecDataProtector(window.ethereum);
			console.log(dataAddress)
			
      const processProtectedDataResponse: ProcessProtectedDataResponse = await dataProtectorCore.core.processProtectedData({
				protectedData: dataAddress, // Pass the specific address
        app: IEXEC_APP_ADDRESS, // Replace with your app's address
				maxPrice: 0,
        onStatusUpdate: ({ title, isDone }) => {
					console.log(title, isDone);
        },
      });
			
			console.log("Bella bro")
			
      console.log("Downloaded Data: ", processProtectedDataResponse.result);
    } catch (error) {
      console.error("Error downloading protected data:", error);
      setErrorMessage("Failed to download protected data.");
    }
  };

  // Fetch the protected data when the component mounts
  useEffect(() => {
    getProtectedData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">Protected Datasets Downloads</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Map through protectedDatas and display them */}
      {protectedDatas.length > 0 ? (
        <div className="w-full max-w-[600px] flex flex-col gap-4">
          {protectedDatas.map((data, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-md shadow-md"
            >
              <p><strong>Address:</strong> {data.address}</p>
              <p><strong>Owner:</strong> {data.owner}</p>
              <Button
                onClick={() => downloadData(data.address)} // Pass the address on button click
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No protected datasets found.</p>
      )}
    </div>
  );
}
