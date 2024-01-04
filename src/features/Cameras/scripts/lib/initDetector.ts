import * as poseDetection from "@tensorflow-models/pose-detection";

export async function initDetector() {
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
