import { getElementById } from "@/utilities/getHTMLElement";
import { clearCanvas } from "./clearCanvas";
import { drawKeypoints } from "./drawKeypoints";
import { PoseDetector } from "@tensorflow-models/pose-detection";
import { virtualButtons } from "./virtualButtons";

export async function main_loop(
  detector: PoseDetector,
  video: HTMLVideoElement
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
    virtualButtons.draw(poses);
    // virtualButtons.draw_grid();

    requestAnimationFrame(() => loop());
  }
  loop();
}
