"use client";

import { createContext, useContext, useState } from "react";

const AddDataContext = createContext({
  open: false,
  setOpen: (open: boolean) => {},
  title: "",
  setTitle: (title: string) => {},
  content: "",
  setContent: (content: string) => {},
});

export default function AddDataContextProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <AddDataContext.Provider value={{ open, setOpen, title, setTitle, content, setContent }}>
      {children}
    </AddDataContext.Provider>
  );
}

export const useAddData = () => useContext(AddDataContext);
