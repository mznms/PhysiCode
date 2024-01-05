import { Keypoint, Pose } from "@tensorflow-models/pose-detection/dist/types";
import {
  getCanvasContext,
  getCanvasElement,
} from "@/features/Cameras/scripts/utils/getHTMLElement";

/**
 * 3x3のグリッドとしてボタンを配置する
 *
 * index :
 *    0 1 2
 *    3 4 5
 *    6 7 8
 */
export const virtualButtons = {
  grid_height: 3,
  grid_width: 3,
  height_rate: [0.25, 0.5, 0.25], // 各行の幅の比
  width_rate: [0.25, 0.5, 0.25], // 各列の幅の比
  buttons_visibility: [
    [true, false, true],
    [true, false, true],
    [true, false, true],
  ],
  valid_keypoints: ["right_wrist", "left_wrist", "right_ankle", "left_ankle"],
  // 0: 通常状態のカラー      1:押されている状態のカラー
  colors: {
    normal: "rgba(100, 100, 100, 0.8)",
    pressed: "rgba(255, 100, 0, 0.3)",
  },

  height_rate_sum: Array(),
  width_rate_sum: Array(),
};

export function buttons_draw_grid() {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const context = getCanvasContext(canvas);

  virtualButtons.height_rate_sum = [0];
  virtualButtons.width_rate_sum = [0];
  let cnt = 0;
  for (let i = 0; i < virtualButtons.grid_width; i++) {
    cnt += virtualButtons.width_rate[i];
    virtualButtons.width_rate_sum.push(cnt);
  }
  cnt = 0;
  for (let i = 0; i < virtualButtons.grid_height; i++) {
    cnt += virtualButtons.height_rate[i];
    virtualButtons.height_rate_sum.push(cnt);
  }

  for (let i = 0; i < virtualButtons.grid_width; i++) {
    let x = canvas.width * virtualButtons.width_rate_sum[i];

    context.beginPath();
    context.moveTo(x, 0); //始点
    context.lineTo(x, canvas.height); //終点
    context.closePath();
    context.stroke();
  }
  for (let i = 0; i < virtualButtons.grid_height; i++) {
    let y = canvas.height * virtualButtons.height_rate_sum[i];

    context.beginPath();
    context.moveTo(0, y); //始点
    context.lineTo(canvas.width, y); //終点
    context.closePath();
    context.stroke();
  }
}

export function buttons_draw(poses: Pose[]) {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const context = getCanvasContext(canvas);

  let keypoints: Keypoint[] = poses.length != 0 ? poses[0].keypoints : Array();

  let cnt = 0;
  for (let i = 0; i < virtualButtons.grid_height; i++) {
    cnt += virtualButtons.height_rate[i];
    virtualButtons.height_rate_sum.push(cnt);
  }
  cnt = 0;
  for (let i = 0; i < virtualButtons.grid_width; i++) {
    cnt += virtualButtons.width_rate[i];
    virtualButtons.width_rate_sum.push(cnt);
  }

  // 仮想ボタンの描画
  for (let i = 0; i < virtualButtons.grid_height; i++) {
    for (let j = 0; j < virtualButtons.grid_width; j++) {
      if (!virtualButtons.buttons_visibility[i][j]) continue;

      let x1, y1, x2, y2: number;
      y1 = canvas.height * virtualButtons.height_rate_sum[i];
      x1 = canvas.width * virtualButtons.width_rate_sum[j];
      y2 = canvas.height * virtualButtons.height_rate_sum[i + 1];
      x2 = canvas.width * virtualButtons.width_rate_sum[j + 1];

      context.fillStyle = virtualButtons.colors.normal;

      for (let target of virtualButtons.valid_keypoints) {
        if (contains(i, j, keypoints, target)) {
          context.fillStyle = virtualButtons.colors.pressed;
        }
      }

      context.fillRect(x1, y1, x2 - x1, y2 - y1);
    }
  }
}

function findKeypointByName(
  keypoints: Keypoint[],
  targetName: String,
): Keypoint | undefined {
  return keypoints.find((keypoint) => keypoint.name === targetName);
}

function contains(h: number, w: number, keypoints: Keypoint[], target: String) {
  let pnt = findKeypointByName(keypoints, target);

  if (pnt == null) return false;

  let x1, y1, x2, y2: number;
  let canvas = getCanvasElement();
  y1 = canvas.height * virtualButtons.height_rate_sum[h];
  x1 = canvas.width * virtualButtons.width_rate_sum[w];
  y2 = canvas.height * virtualButtons.height_rate_sum[h + 1];
  x2 = canvas.width * virtualButtons.width_rate_sum[w + 1];

  return x1 <= pnt.x && pnt.x <= x2 && y1 <= pnt.y && pnt.y <= y2;
}
