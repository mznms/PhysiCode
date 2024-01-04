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
  buttons_visibility: [true, false, true, true, false, true, true, false, true],
  valid_keypoints: ["right_wrist", "left_wrist", "right_ankle", "left_ankle"],
  buttons_state: {
    none: 0,
    left_hand: 1,
    right_hand: 2,
    left_ankle: 3,
    right_ankle: 4,
  },
  // 0: 通常状態のカラー      1:押されている状態のカラー
  colors: ["rgba(100, 100, 100, 0.8)", "rgba(255, 100, 0, 0.3)"],

  draw_grid: function () {
    // Canvas要素を取得
    const canvas = getCanvasElement();
    const context = getCanvasContext(canvas);

    let width_rate_sum = [0];
    let height_rate_sum = [0];
    let cnt = 0;
    for (let i = 0; i < this.grid_width; i++) {
      cnt += this.width_rate[i];
      width_rate_sum.push(cnt);
    }
    cnt = 0;
    for (let i = 0; i < this.grid_height; i++) {
      cnt += this.height_rate[i];
      height_rate_sum.push(cnt);
    }

    for (let i = 0; i < this.grid_width; i++) {
      let x = canvas.width * width_rate_sum[i];

      context.beginPath();
      context.moveTo(x, 0); //始点
      context.lineTo(x, canvas.height); //終点
      context.closePath();
      context.stroke();
    }
    for (let i = 0; i < this.grid_height; i++) {
      let y = canvas.height * height_rate_sum[i];

      context.beginPath();
      context.moveTo(0, y); //始点
      context.lineTo(canvas.width, y); //終点
      context.closePath();
      context.stroke();
    }
  },
  draw: function (poses: Pose[]) {
    // Canvas要素を取得
    const canvas = getCanvasElement();
    const context = getCanvasContext(canvas);

    let keypoints: Keypoint[] =
      poses.length != 0 ? poses[0].keypoints : Array();

    let height_rate_sum = [0];
    let width_rate_sum = [0];
    let cnt = 0;
    for (let i = 0; i < this.grid_height; i++) {
      cnt += this.height_rate[i];
      height_rate_sum.push(cnt);
    }
    cnt = 0;
    for (let i = 0; i < this.grid_width; i++) {
      cnt += this.width_rate[i];
      width_rate_sum.push(cnt);
    }

    // 仮想ボタンの描画
    for (let i = 0; i < this.grid_height; i++) {
      for (let j = 0; j < this.grid_width; j++) {
        if (!this.buttons_visibility[i * this.grid_width + j]) continue;

        let x1, y1, x2, y2: number;
        y1 = canvas.height * height_rate_sum[i];
        x1 = canvas.width * width_rate_sum[j];
        y2 = canvas.height * height_rate_sum[i + 1];
        x2 = canvas.width * width_rate_sum[j + 1];

        context.fillStyle = this.colors[0];
        context.fillRect(x1, y1, x2 - x1, y2 - y1);
      }
    }
  },
};

// function getKeypointByName(keypoints : Keypoint[], targetName: String) {
//   return keypoints.find( ( point :Keypoint ) => point.name === targetName);
// }
