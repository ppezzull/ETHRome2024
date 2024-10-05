"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useiExec } from "@/hooks/iExec/useiExec";
import { BELLECOUR_CHAIN_ID } from "@/utils/iExec/utils";
import { IExecDataProtector, ProtectedData } from "@iexec/dataprotector";
import { totalmem } from "os";
import { toast } from "sonner";

export default function GetProtectedData() {
  return <></>;

  //   return (
  //     <div className="flex flex-col items-center gap-8">
  //       <h1 className="text-2xl font-bold">Protected Datasets</h1>

  //       {/* Map through protectedDatas and display them */}
  //       {protectedDatas.length > 0 ? (
  //         <div className="w-full max-w-[600px] flex flex-col gap-4">
  //           {protectedDatas.map((data, index) => (
  //             <div key={index} className="p-4 border border-gray-300 rounded-md shadow-md">
  //               <p>
  //                 <strong>Address:</strong> {data.address}
  //               </p>
  //               <p>
  //                 <strong>Name:</strong> {data.name}
  //               </p>
  //               <p>
  //                 <strong>Owner:</strong> {data.owner}
  //               </p>
  //               <p>
  //                 <strong>Multiaddr:</strong> {data.multiaddr}
  //               </p>
  //               <p>
  //                 <strong>Creation Timestamp:</strong> {new Date(data.creationTimestamp * 1000).toLocaleString()}
  //               </p>
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         <p>No protected datasets found.</p>
  //       )}

  //       {/* Optional manual refresh button */}
  //       <Button onClick={getProtectedData}>Refresh Data</Button>
  //     </div>
  //   );
}
