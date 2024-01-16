import { useEffect, useRef, useState } from "react";
import { useBodyProgrammingEditor } from "../BodyProgrammingEditor/bodyProgrammingEditorContext";
import { useCode } from "../Code/codeContext";
import { animate } from "./animate";
import { initCenteringPromptFontSize } from "./scripts/lib/canvas/centeringPrompt";
import { initVirtualButtons } from "./scripts/lib/canvas/virtualButtons";
import { getDetector } from "./scripts/lib/getDetector";

export function usePoseDetection() {
  const { code, setCode } = useCode();
  const { isLoading, setIsLoading } = useBodyProgrammingEditor();
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameId = useRef(0);

  useEffect(() => {
    async function initDetector() {
      setIsLoading(true);
      // 一回目に呼ぶと detector はメモリにキャッシュされる
      await getDetector();

      setIsLoading(false);
    }

    console.log("initialize effect");
    const currentVideoRef = videoRef.current;
    initVirtualButtons();
    initDetector();
    initCenteringPromptFontSize();

    return () => {
      console.log("unmount");
      cancelAnimationFrame(frameId.current);

      if (currentVideoRef) {
        unloadCamera(currentVideoRef);
      }
    };
  }, [setIsLoading]);

  useEffect(() => {
    console.log("animation effect");
    frameId.current = requestAnimationFrame((currentTime) =>
      animate(currentTime, code, setCode, frameId),
    );
    return () => {
      console.log("animation unmount");
      cancelAnimationFrame(frameId.current);
    };
  }, [code, setCode]);

  return { isLoading, videoRef };
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
