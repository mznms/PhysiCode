import { PoseDetector } from "@tensorflow-models/pose-detection/dist/pose_detector";
import { clearCanvas } from "./lib/canvas/clearCanvas";
import { drawKeypoints } from "./lib/canvas/drawKeypoints";
import {
  virtualButtons,
  buttons_draw,
  buttons_draw_grid,
  centeringPrompt,
} from "./lib/canvas/virtualButtons";
import { getElementById } from "@/features/Cameras/scripts/utils/getHTMLElement";

export async function main_loop(
  detector: PoseDetector,
  video: HTMLVideoElement,
) {
  let fps = 0;
  let frameCount = 0;
  let startTime: number;
  let endTime: number;

  startTime = new Date().getTime();

  async function loop() {
    frameCount += 1;
    endTime = new Date().getTime();

    clearCanvas();

    if (endTime - startTime >= 1000) {
      startTime = endTime;
      fps = frameCount;
      frameCount = 0;
      const fpsElement = getElementById("fps");
      fpsElement.innerText = "FPS : " + fps;
    }

    const poses = await detector.estimatePoses(video);
    if (poses.length == 1) {
      drawKeypoints(poses[0].keypoints);
    }
    buttons_draw(poses);
    buttons_draw_grid();
    centeringPrompt(poses);

    requestAnimationFrame(() => loop());
  }
  loop();
}
