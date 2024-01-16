import { centeringPrompt } from "./scripts/lib/canvas/centeringPrompt";
import { getLatestInput } from "./scripts/lib/canvas/checkInput";
import { drawKeypoints } from "./scripts/lib/canvas/drawKeypoints";
import { buttons_update } from "./scripts/lib/canvas/virtualButtons";
import { drawCameraCanvas } from "./scripts/lib/drawCameraCanvas";
import { getCameraElement } from "./scripts/lib/getCameraElement";
import { getDetector } from "./scripts/lib/getDetector";
import { getCameraCanvasElement } from "./scripts/utils/getHTMLElement";

// ! この関数を呼び出す前に detector の初期化を行っておくこと
export async function getCharacterCorrespondsToCurrentPose() {
  async function waitUntilCameraIsReady() {
    await getCameraElement();
  }

  await waitUntilCameraIsReady();

  const detector = await getDetector();

  drawCameraCanvas();
  const cameraCanvas = getCameraCanvasElement();

  const poses = await detector.estimatePoses(cameraCanvas);
  if (poses.length == 1) {
    drawKeypoints(poses[0].keypoints);
  }
  buttons_update(poses);
  centeringPrompt(poses);
  const newCharacter = getLatestInput();
  return newCharacter;
}
