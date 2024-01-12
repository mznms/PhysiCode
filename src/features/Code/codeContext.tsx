import { createContext, useContext, useMemo, useState } from "react";

export type CodeContextType = {
  code: string;
  setCode: (code: string) => void;
};

export const CodeContext = createContext<CodeContextType>({
  code: "",
  setCode: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function CodeProvider({ children }: Props) {
  const [code, setCode] = useState("");
  const value = useMemo(() => ({ code, setCode }), [code, setCode]);

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
}

export function useCode() {
  return useContext(CodeContext);
}
