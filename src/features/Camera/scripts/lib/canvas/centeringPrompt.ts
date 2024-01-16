import { draw } from "@tensorflow/tfjs-core/dist/ops/browser";
import { Keypoint, Pose } from "@tensorflow-models/pose-detection/dist/types";
import { virtualButtons, contains, findKeypointByName } from "./virtualButtons";
import {
  getCanvasContext,
  getCanvasElement,
  getCameraCanvasElement,
} from "@/features/Cameras/scripts/utils/getHTMLElement";

const img = new Image();
img.src = "https://svgsilh.com/svg/310276.svg";
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
  let keypoints: Keypoint[] = poses.length != 0 ? poses[0].keypoints : Array();

  // nose
  if (!containsOnScreen(keypoints, "nose")) {
    drawCenteringPrompt();
    return;
  }

  // wrist
  if (!containsOnScreen(keypoints, "left_wrist")) {
    drawCenteringPrompt();
    return;
  }
  if (!containsOnScreen(keypoints, "right_wrist")) {
    drawCenteringPrompt();
    return;
  }

  // ankle
  let isAnkleAtBottomOfScreen = false;
  for (let i = 0; i < virtualButtons.grid_width; i++) {
    if (contains({ h: 2, w: i }, keypoints, "left_ankle")) {
      isAnkleAtBottomOfScreen = true;
      break;
    }
    if (contains({ h: 2, w: i }, keypoints, "right_ankle")) {
      isAnkleAtBottomOfScreen = true;
      break;
    }
  }
  if (!isAnkleAtBottomOfScreen) {
    drawCenteringPrompt();
    return;
  }
}

function drawCenteringPrompt() {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const cameraContext = getCanvasContext(canvas);

  cameraContext.globalAlpha = 0.4;
  cameraContext.drawImage(img, 0, 0, canvas.width, canvas.height);
  cameraContext.globalAlpha = 1;

  cameraContext.textAlign = "center";
  cameraContext.scale(-1, 1); // キャンバスが水平反転しているので文字も反転させる
  cameraContext.fillStyle = "red";
  cameraContext.font = centeringPromptFont;
  cameraContext.fillText(
    centeringPromptText,
    -canvas.width / 2, // scale で反転させているため負の値にする
    (canvas.height * 2) / 3,
  );
}

function containsOnScreen(keypoints: Keypoint[], target: string) {
  let pnt = findKeypointByName(keypoints, target);

  if (pnt == null) return false;
  if (pnt.score && pnt.score < 0.3) return false;

  return true;
}
