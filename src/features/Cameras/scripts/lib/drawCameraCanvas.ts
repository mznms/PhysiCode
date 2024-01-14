import {
  getCameraCanvasElement,
  getVideoElement,
} from "../utils/getHTMLElement";

export function drawCameraCanvas() {
  const video = getVideoElement();
  const cameraCanvas = getCameraCanvasElement();

  // キャンバスサイズを正方形にする
  const length = Math.min(video.clientWidth, video.clientHeight);
  cameraCanvas.width = length;
  cameraCanvas.height = length;

  // カメラ映像をキャンバスに転写する
  let sx, sy;

  // 縦長のカメラ
  if (video.clientWidth < video.clientHeight) {
    sx = 0;
    sy = (video.clientHeight - length) / 2;
  }
  // 横長のカメラ
  else {
    sx = (video.clientWidth - length) / 2;
    sy = 0;
  }
  cameraCanvas
    .getContext("2d")
    ?.drawImage(video, sx, sy, length, length, 0, 0, length, length);

  // TODO: スケールを調整する
}
