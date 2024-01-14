import * as poseDetection from "@tensorflow-models/pose-detection";

let detector: poseDetection.PoseDetector | null = null;

export async function getDetector() {
  if (detector !== null) {
    return detector;
  }
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    minPoseScore: 0.3,
    trackerType: poseDetection.TrackerType.BoundingBox,
  };
  console.log("detector initializing");
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig,
  );
  console.log("detectoor initizlized");
  return detector;
}
