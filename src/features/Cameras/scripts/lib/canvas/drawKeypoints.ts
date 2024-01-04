import {
  getCanvasContext,
  getCanvasElement,
  getVideoElement,
} from "@/features/Cameras/scripts/utils/getHTMLElement";
import { Keypoint } from "@tensorflow-models/pose-detection";

const REVERSE = true;

// canvas上にkeypointsを元に点を描画する
// canvasはvideoと重ねて表示される
export function drawKeypoints(keypoints: Keypoint[]) {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const video = getVideoElement();

  matchCanvasSizeToVideo(canvas, video);

  const context = getCanvasContext(canvas);

  // 点を描画
  context.fillStyle = "rgba(255, 255, 0, 1)";
  for (let pnt of keypoints) {
    let x = pnt.x;
    let y = pnt.y;
    if (REVERSE) {
      x = canvas.width - x;
    }
    if (pnt.score && pnt.score > 0.3) context.fillRect(x, y, 10, 10);
  }
}

// Canvasのサイズをvideoと合わせる
function matchCanvasSizeToVideo(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement
) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
}
