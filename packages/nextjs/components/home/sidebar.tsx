"use client";

import { AccountSwitcher } from "./account-switcher";
import Links from "./links";
import { useWatchBalance } from "@/hooks/scaffold-eth";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { useAccount } from "wagmi";

export default function Sidebar() {
  return (
    <aside className="h-full py-6 px-4 w-[380px] overflow-auto">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <AccountSwitcher />
        <Links
          links={[
            {
              title: "Inbox",
              label: "128",
              icon: Inbox,
              variant: "default",
            },
            {
              title: "Drafts",
              label: "9",
              icon: File,
              variant: "ghost",
            },
            {
              title: "Sent",
              label: "",
              icon: Send,
              variant: "ghost",
            },
            {
              title: "Junk",
              label: "23",
              icon: ArchiveX,
              variant: "ghost",
            },
            {
              title: "Trash",
              label: "",
              icon: Trash2,
              variant: "ghost",
            },
            {
              title: "Archive",
              label: "",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
        <Links
          links={[
            {
              title: "Inbox",
              label: "128",
              icon: Inbox,
              variant: "default",
            },
            {
              title: "Drafts",
              label: "9",
              icon: File,
              variant: "ghost",
            },
            {
              title: "Sent",
              label: "",
              icon: Send,
              variant: "ghost",
            },
            {
              title: "Junk",
              label: "23",
              icon: ArchiveX,
              variant: "ghost",
            },
            {
              title: "Trash",
              label: "",
              icon: Trash2,
              variant: "ghost",
            },
            {
              title: "Archive",
              label: "",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
      </nav>
    </aside>
  );
}
