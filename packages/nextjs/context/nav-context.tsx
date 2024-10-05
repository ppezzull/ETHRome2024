"use client";

import { createContext, useContext, useState } from "react";

const NavContext = createContext({
  open: false,
  setOpen: (open: boolean) => {},
});

export default function NavContextProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  return <NavContext.Provider value={{ open, setOpen }}>{children}</NavContext.Provider>;
}

export const useNav = () => useContext(NavContext);
