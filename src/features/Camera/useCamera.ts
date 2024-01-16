import { useContext } from "react";
import { cameraContext } from "./cameraContext";

export function useCamera() {
  const { isOpen, setIsOpen } = useContext(cameraContext);

  return { isOpen, setIsOpen };
}
