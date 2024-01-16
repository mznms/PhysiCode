import { useEffect, useRef } from "react";
import { useCode } from "../Code/codeContext";
import { animate } from "./animate";
import { initVirtualButtons } from "./scripts/lib/canvas/virtualButtons";

export function usePoseDetection() {
  const { code, setCode } = useCode();
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameId = useRef(0);

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
    return () => {
      cancelAnimationFrame(frameId.current);
    };
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
