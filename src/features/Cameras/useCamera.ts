import * as tf from "@tensorflow/tfjs-core";
import { useEffect } from "react";
import { initDetector } from "./scripts/lib/initDetector";
import { initVideoCamera } from "./scripts/lib/initVideoCamera";
import { main_loop } from "./scripts/mainLoop";
import { getVideoElement } from "@/features/Cameras/scripts/utils/getHTMLElement";
import "@tensorflow/tfjs-backend-webgl";

export function useCamera() {
  useEffect(() => {
    async function main() {
      await tf.ready();
      await tf.setBackend("webgl");
      await initVideoCamera();
      const detector = await initDetector();
      const video = getVideoElement();
      main_loop(detector, video);
    }

    main();
  }, []);
}
