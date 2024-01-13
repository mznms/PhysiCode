import { PoseDetector } from "@tensorflow-models/pose-detection/dist/pose_detector";
import { clearCanvas } from "./lib/canvas/clearCanvas";
import { drawKeypoints } from "./lib/canvas/drawKeypoints";
import {
  buttons_update,
  initVirtualButtons,
} from "./lib/canvas/virtualButtons";
import { drawCameraCanvas } from "./lib/drawCameraCanvas";
import { getElementById } from "@/features/Cameras/scripts/utils/getHTMLElement";

export async function main_loop(
  detector: PoseDetector,
  cameraCanvas: HTMLCanvasElement,
) {
  let fps = 0;
  let frameCount = 0;
  let startTime: number;
  let endTime: number;

  startTime = new Date().getTime();

  initVirtualButtons();

  async function loop() {
    frameCount += 1;
    endTime = new Date().getTime();

    clearCanvas();

    // FPSの計算
    if (endTime - startTime >= 1000) {
      startTime = endTime;
      fps = frameCount;
      frameCount = 0;
      const fpsElement = getElementById("fps");
      fpsElement.innerText = "FPS : " + fps;
    }

    // videoからcamera-canvasへの転写
    drawCameraCanvas();

    const poses = await detector.estimatePoses(cameraCanvas);
    if (poses.length == 1) {
      drawKeypoints(poses[0].keypoints);
    }
    buttons_update(poses);

    requestAnimationFrame(() => loop());
  }
  loop();
}
