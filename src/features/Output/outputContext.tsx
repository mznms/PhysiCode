import { createContext, useContext, useMemo, useState } from "react";

export type outputContextType = {
  output: string;
  setOutput: (code: string) => void;
};

export const outputContext = createContext<outputContextType>({
  output: "",
  setOutput: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function OutputProvider({ children }: Props) {
  const [output, setOutput] = useState("");
  const value = useMemo(() => ({ output, setOutput }), [output, setOutput]);

  return (
    <outputContext.Provider value={value}>{children}</outputContext.Provider>
  );
}

export function useOutput() {
  return useContext(outputContext);
}
