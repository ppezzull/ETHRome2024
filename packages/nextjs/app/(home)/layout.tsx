"use client";

import AddNoteEditor from "@/components/editor/editor-sheet";
import Sidebar from "@/components/home/sidebar";
import AddDataContextProvider from "@/context/add-data-sheet-context";
import { useAccount } from "wagmi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();

  return (
    <div className="h-svh flex">
      <AddDataContextProvider>
		<AddNoteEditor />
        {isConnected && <Sidebar />}
        <main className="w-full">{children}</main>
      </AddDataContextProvider>
    </div>
  );
}
