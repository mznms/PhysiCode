import { useEffect, useRef } from "react";
import { useCode } from "../Code/codeContext";
import { animate } from "./animate";
import { initVirtualButtons } from "./scripts/lib/canvas/virtualButtons";

export function useCamera() {
  const { code, setCode } = useCode();
  const frameId = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    initVirtualButtons();
    return () => {
      console.log("animate");
      cancelAnimationFrame(frameId.current);

      if (currentVideoRef) {
        unloadCamera(currentVideoRef);
      }
    };
  }, []);

  useEffect(() => {
    frameId.current = requestAnimationFrame((currentTime) =>
      animate(currentTime, code, setCode, frameId),
    );
  }, [code, setCode]);

  return { videoRef };
}

function unloadCamera(cameraElement: HTMLVideoElement) {
  if (cameraElement.srcObject instanceof MediaStream) {
    const stream = cameraElement.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    cameraElement.srcObject = null;
  }
}
