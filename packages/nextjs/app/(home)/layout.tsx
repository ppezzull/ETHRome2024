"use client";

import AddNoteEditor from "@/components/editor/editor-sheet";
import Sidebar from "@/components/home/sidebar";
import AddDataContextProvider from "@/context/add-data-sheet-context";
import { useNav } from "@/context/nav-context";
import { useAccount } from "wagmi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const { open, setOpen } = useNav();

  return (
    <div className="h-svh flex flex-col md:flex-row">
      <AddDataContextProvider>
        <AddNoteEditor />
        {isConnected && <Sidebar />}
        <main
          className="w-full"
          onClick={() => {
            if (open) setOpen(false);
          }}
        >
          {children}
        </main>
      </AddDataContextProvider>
    </div>
  );
}
