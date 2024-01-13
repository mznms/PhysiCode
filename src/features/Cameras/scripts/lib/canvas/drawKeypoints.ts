import { Keypoint } from "@tensorflow-models/pose-detection/dist/types";
import {
  getCameraCanvasElement,
  getCanvasContext,
  getCanvasElement,
} from "@/features/Cameras/scripts/utils/getHTMLElement";

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
  for (let pnt of keypoints) {
    let x = pnt.x;
    let y = pnt.y;
    if (pnt.score && pnt.score > 0.3) context.fillRect(x, y, 10, 10);
  }
}

// Canvasのサイズをvideoと合わせる
function matchCanvasSizeToCameraCanvas(
  canvas: HTMLCanvasElement,
  cameraCanvas: HTMLCanvasElement,
) {
  canvas.width = cameraCanvas.width;
  canvas.height = cameraCanvas.height;
}
