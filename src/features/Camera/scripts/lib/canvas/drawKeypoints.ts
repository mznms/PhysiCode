import { Keypoint } from "@tensorflow-models/pose-detection/dist/types";
import {
  getCameraCanvasElement,
  getCanvasContext,
  getCanvasElement,
} from "@/features/Camera/scripts/utils/getHTMLElement";

// canvas上にkeypointsを元に点を描画する
// canvasはvideoと重ねて表示される
export function drawKeypoints(keypoints: Keypoint[]) {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const cameraCanvas = getCameraCanvasElement();

  matchCanvasSizeToCameraCanvas(canvas, cameraCanvas);

  const context = getCanvasContext(canvas);

  // 点を描画
  context.fillStyle = "rgba(255, 255, 0, 1)";
  const valid_keypoints = [
    "right_wrist",
    "left_wrist",
    "right_ankle",
    "left_ankle",
  ];
  for (let keypointName of valid_keypoints) {
    let pnt = findKeypointByName(keypoints, keypointName);
    if (pnt === undefined) continue;
    let x = pnt.x;
    let y = pnt.y;
    if (pnt.score && pnt.score > 0.2) context.fillRect(x, y, 10, 10);
  }
}

function findKeypointByName(
  keypoints: Keypoint[],
  targetName: string,
): Keypoint | undefined {
  return keypoints.find((keypoint) => keypoint.name === targetName);
}

// Canvasのサイズをvideoと合わせる
function matchCanvasSizeToCameraCanvas(
  canvas: HTMLCanvasElement,
  cameraCanvas: HTMLCanvasElement,
) {
  canvas.width = cameraCanvas.width;
  canvas.height = cameraCanvas.height;
}
