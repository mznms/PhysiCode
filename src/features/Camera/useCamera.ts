import { useContext } from "react";
import { cameraContext } from "./cameraContext";

export function useCamera() {
  const { isOpen, setIsOpen, isLoading, setIsLoading } =
    useContext(cameraContext);

  return { isOpen, setIsOpen, isLoading, setIsLoading };
}
