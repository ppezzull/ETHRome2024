"use client";

import { Button } from "../ui/button";
import { AccountSwitcher } from "./account-switcher";
import { useNav } from "@/context/nav-context";
import { Menu } from "lucide-react";

export default function MobileNav() {
  const { open, setOpen } = useNav();

  return (
    <div className="md:hidden h-14 mb-6 flex w-full  items-center justify-between">
      <Button onClick={() => setOpen(!open)} variant={"outline"}>
        <Menu size={24} />
      </Button>
      <AccountSwitcher mobile />
    </div>
  );
}
