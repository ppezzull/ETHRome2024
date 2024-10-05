"use client";

import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { AccountSwitcher } from "./account-switcher";
import Links from "./links";
import { useWatchBalance } from "@/hooks/scaffold-eth";
import { HistoryIcon, Inbox, Settings, User2, Users2 } from "lucide-react";
import { useAccount } from "wagmi";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full py-6 px-4 w-[380px] overflow-auto">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <AccountSwitcher />
        <Links
          links={[
            {
              title: "DefaultVault",
              label: "",
              icon: Inbox,
              variant: pathname === "/" ? "default" : "ghost",
            },
          ]}
        />
        <Separator className="my-2" />
        <Links
          links={[
            {
              title: "Settings",
              label: "",
              icon: Settings,
              variant: pathname === "/settings" ? "default" : "ghost",
            },
            {
              title: "History",
              label: "",
              icon: HistoryIcon,
              variant: pathname === "/history" ? "default" : "ghost",
            },
            {
              title: "Profile",
              label: "",
              icon: User2,
              variant: pathname === "/profile" ? "default" : "ghost",
            },
          ]}
        />
      </nav>
    </aside>
  );
}
