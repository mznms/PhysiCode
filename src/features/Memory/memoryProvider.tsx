import { createContext, useContext, useMemo, useState } from "react";

const MEMORY_SIZE = 64; // この数値が何を意味するのかを示す名前
const initialMemory = Array.from({ length: MEMORY_SIZE }, () => 0);

export type memoryContextType = {
  memory: number[];
  setMemory: (memory: number[]) => void;
};

export const memoryContext = createContext<memoryContextType>({
  memory: initialMemory,
  setMemory: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function MemoryProvider({ children }: Props) {
  const [memory, setMemory] = useState(initialMemory);
  const value = useMemo(() => ({ memory, setMemory }), [memory, setMemory]);

  return (
    <memoryContext.Provider value={value}>{children}</memoryContext.Provider>
  );
}

export function useMemory() {
  return useContext(memoryContext);
}
