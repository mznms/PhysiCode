import { Keypoint, Pose } from "@tensorflow-models/pose-detection/dist/types";
import { virtualButtons, findKeypointByName } from "./virtualButtons";
import {
  getCanvasContext,
  getCanvasElement,
  getCameraCanvasElement,
} from "@/features/Cameras/scripts/utils/getHTMLElement";

const centeringPromptText = "全身を中央に映してください";

let fontSize = 1;
let centeringPromptFont = `bold ${fontSize}px sans-serif`;

export function initCenteringPromptFontSize() {
  // Canvas要素を取得
  const cameraCanvas = getCameraCanvasElement();
  const cameraContext = getCanvasContext(cameraCanvas);

  cameraContext.textAlign = "center";
  cameraContext.scale(-1, 1); // キャンバスが水平反転しているので文字も反転させる
  cameraContext.fillStyle = "red";
  cameraContext.font = centeringPromptFont;
  let textWidth = cameraContext.measureText(centeringPromptText).width;

  while (textWidth < cameraCanvas.width * 0.8) {
    fontSize++;
    centeringPromptFont = `bold ${fontSize}px sans-serif`;
    cameraContext.font = centeringPromptFont;
    textWidth = cameraContext.measureText(centeringPromptText).width;
  }
}

export function centeringPrompt(poses: Pose[]) {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const cameraContext = getCanvasContext(canvas);

  let keypoints: Keypoint[] = poses.length != 0 ? poses[0].keypoints : Array();

  for (let target of virtualButtons.valid_keypoints) {
    if (!contains(keypoints, target)) {
      cameraContext.textAlign = "center";
      cameraContext.scale(-1, 1); // キャンバスが水平反転しているので文字も反転させる
      cameraContext.fillStyle = "red";
      cameraContext.font = centeringPromptFont;
      cameraContext.fillText(
        centeringPromptText,
        -canvas.width / 2, // scale で反転させているため負の値にする
        (canvas.height * 2) / 3,
      );

      return;
    }
  }
}

function contains(keypoints: Keypoint[], target: string) {
  let pnt = findKeypointByName(keypoints, target);

  if (pnt == null) return false;
  if (pnt.score && pnt.score < 0.3) return false;

  return true;
}
