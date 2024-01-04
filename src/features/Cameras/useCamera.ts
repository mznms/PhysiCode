import { useEffect } from "react";
import { main_loop } from "./mainLoop";
import { initVideoCamera } from "./initVideoCamera";
import { initDetector } from "./initDetector";
import { getVideoElement } from "@/utilities/getHTMLElement";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";

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
