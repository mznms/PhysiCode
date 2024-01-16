import { createContext, useContext, useMemo, useState } from "react";

export type cameraContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const cameraContext = createContext<cameraContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function CameraProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <cameraContext.Provider value={value}>{children}</cameraContext.Provider>
  );
}
