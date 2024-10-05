"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import DisconnectButton from "../auth/disconnect-button";
import { Separator } from "../ui/separator";
import { AccountSwitcher } from "./account-switcher";
import Links from "./links";
import { useNav } from "@/context/nav-context";
import { HistoryIcon, RadioTower, Settings, User2, Vault } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { open } = useNav();

  return (
    <aside
      className={`h-full py-6 px-4 transition-all w-[300px] md:w-[380px] overflow-auto absolute  ${
        open ? " border-r-2 z-50 bg-background" : "-ml-96"
      } md:relative md:ml-0`}
    >
      <nav className="flex flex-col justify-between h-full gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <div className="flex w-full flex-col">
          <div className="w-full md:flex mb-6 hidden">
            <AccountSwitcher />
          </div>
          <Links
            links={[
              {
                title: "DefaultVault",
                label: "",
                href: "/",
                icon: Vault,
                variant: pathname === "/" ? "default" : "ghost",
              },
            ]}
          />
          <Separator className="my-4" />
          <Links
            links={[
              {
                title: "SharedVault",
                label: "",
                href: "/shared",
                icon: RadioTower,
                variant: pathname === "/shared" ? "default" : "ghost",
              },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Links
            links={[
              {
                title: "Profile",
                label: "",
                href: "/profile",
                icon: User2,
                variant: pathname === "/profile" ? "default" : "ghost",
              },

              {
                title: "Transactions",
                label: "",
                href: "/transactions",
                icon: HistoryIcon,
                variant: pathname === "/history" ? "default" : "ghost",
              },
              {
                title: "Settings",
                label: "",
                href: "/settings",
                icon: Settings,
                variant: pathname === "/settings" ? "default" : "ghost",
              },
            ]}
          />
          <Separator className="my-4" />
          <DisconnectButton />
        </div>
      </nav>
    </aside>
  );
}
