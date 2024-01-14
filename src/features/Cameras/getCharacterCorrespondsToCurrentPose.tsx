import * as tf from "@tensorflow/tfjs-core";
import { drawKeypoints } from "./scripts/lib/canvas/drawKeypoints";
import { buttons_update } from "./scripts/lib/canvas/virtualButtons";
import { getCameraElement } from "./scripts/lib/getCameraElement";
import { getDetector } from "./scripts/lib/getDetector";
import "@tensorflow/tfjs-backend-webgl";

let hasInitialized = false;

export async function getCharacterCorrespondsToCurrentPose() {
  if (!hasInitialized) {
    await tf.ready();
    await tf.setBackend("webgl");
    hasInitialized = true;
  }
  const cameraElement = await getCameraElement();
  const detector = await getDetector();

  const poses = await detector.estimatePoses(cameraElement);
  if (poses.length == 1) {
    drawKeypoints(poses[0].keypoints);
  }
  const newCharacter = buttons_update(poses);
  return newCharacter;
}
