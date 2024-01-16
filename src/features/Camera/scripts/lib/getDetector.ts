import * as tf from "@tensorflow/tfjs-core";
import * as poseDetection from "@tensorflow-models/pose-detection";

import "@tensorflow/tfjs-backend-webgl";
let detector: poseDetection.PoseDetector | null = null;

export async function getDetector() {
  if (detector !== null) {
    return detector;
  }
  detector = await initDetector();
  return detector;
}

export async function initDetector() {
  await tf.ready();
  await tf.setBackend("webgl");

  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    minPoseScore: 0.3,
    trackerType: poseDetection.TrackerType.BoundingBox,
  };
  console.log("detector initializing");
  const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig,
  );
  console.log("detectoor initizlized");
  return detector;
}
