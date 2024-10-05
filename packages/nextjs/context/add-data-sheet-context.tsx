"use client";

import { createContext, useContext, useState } from "react";

const AddDataContext = createContext({
  open: false,
  setOpen: (open: boolean) => {},
  //   product: null,
  //   setItem: (product: any) => {},
});

export default function AddDataContextProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  //   const [product, setProduct] = useState<any>(null);

  return (
    <AddDataContext.Provider value={{ open, setOpen /* product, setProduct */ }}>{children}</AddDataContext.Provider>
  );
}

export const useAddData = () => useContext(AddDataContext);
