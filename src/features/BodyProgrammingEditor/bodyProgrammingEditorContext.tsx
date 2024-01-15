import { createContext, useContext, useMemo, useState } from "react";

export type bodyProgrammingEditorContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const bodyProgrammingEditorContext =
  createContext<bodyProgrammingEditorContextType>({
    isOpen: false,
    setIsOpen: () => {},
  });

type Props = {
  children: React.ReactNode;
};

export function BodyProgrammingEditorProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <bodyProgrammingEditorContext.Provider value={value}>
      {children}
    </bodyProgrammingEditorContext.Provider>
  );
}

export function useBodyProgrammingEditor() {
  return useContext(bodyProgrammingEditorContext);
}
