import {
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type Block = {
  isFocused: boolean;
  value: number;
};

export type memoryContextType = {
  memory: Block[];
  setMemory: React.Dispatch<SetStateAction<Block[]>>;
};

const initialValue: Block[] = [...Array(32)].map(() => {
  return {
    isFocused: false,
    value: 0,
  };
});

export const memoryContext = createContext<memoryContextType>({
  memory: initialValue,
  setMemory: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function MemoryProvider({ children }: Props) {
  const [memory, setMemory] = useState(initialValue);
  const value = useMemo(() => ({ memory, setMemory }), [memory, setMemory]);

  return (
    <memoryContext.Provider value={value}>{children}</memoryContext.Provider>
  );
}

export function useMemory() {
  return useContext(memoryContext);
}
