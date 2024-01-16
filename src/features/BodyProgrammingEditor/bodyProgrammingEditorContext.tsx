import { createContext, useContext, useMemo, useState } from "react";

export type BodyProgrammingEditorContextType = {
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const BodyProgrammingEditorContext =
  createContext<BodyProgrammingEditorContextType>({
    isOpen: false,
    isLoading: false,
    setIsOpen: () => {},
    setIsLoading: () => {},
  });

type Props = {
  children: React.ReactNode;
};

export function BodyProgrammingEditorProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const value = useMemo(
    () => ({ isOpen, isLoading, setIsOpen, setIsLoading }),
    [isOpen, isLoading, setIsOpen, setIsLoading],
  );

  return (
    <BodyProgrammingEditorContext.Provider value={value}>
      {children}
    </BodyProgrammingEditorContext.Provider>
  );
}

export function useBodyProgrammingEditor() {
  return useContext(BodyProgrammingEditorContext);
}
