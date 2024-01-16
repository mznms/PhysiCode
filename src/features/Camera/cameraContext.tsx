import { createContext, useContext, useMemo, useState } from "react";

export type cameraContextType = {
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const cameraContext = createContext<cameraContextType>({
  isOpen: false,
  isLoading: false,
  setIsOpen: () => {},
  setIsLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function CameraProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const value = useMemo(
    () => ({ isOpen, isLoading, setIsOpen, setIsLoading }),
    [isOpen, isLoading, setIsOpen, setIsLoading],
  );

  return (
    <cameraContext.Provider value={value}>{children}</cameraContext.Provider>
  );
}
