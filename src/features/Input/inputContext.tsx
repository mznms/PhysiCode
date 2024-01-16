import { createContext, useContext, useMemo, useState } from "react";

export type InputContextType = {
  input: string;
  setInput: (input: string) => void;
};

export const InputContext = createContext<InputContextType>({
  input: "",
  setInput: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function InputProvider({ children }: Props) {
  const [input, setInput] = useState("");
  const value = useMemo(() => ({ input, setInput }), [input, setInput]);

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
}

export function useInput() {
  return useContext(InputContext);
}
