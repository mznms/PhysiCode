import { useEffect, useRef } from "react";
import { useCode } from "../Code/codeContext";
import { animate } from "./animate";
import { initVirtualButtons } from "./scripts/lib/canvas/virtualButtons";
import { getElementById } from "@/features/Cameras/scripts/utils/getHTMLElement";

export function useCamera() {
  const { code, setCode } = useCode();
  const frameId = useRef(0);

  useEffect(() => {
    initVirtualButtons();
    frameId.current = requestAnimationFrame((currentTime) =>
      animate(currentTime, code, setCode, frameId),
    );

    return () => {
      cancelAnimationFrame(frameId.current);
    };
  }, [code, setCode]);

  function stopCamera() {
    const videoContainerElement = getElementById("container");
    videoContainerElement.style.display = "none";
  }
  return { stopCamera };
}
