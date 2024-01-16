import { getElementById } from "../utils/getHTMLElement";

let endTime = 0;
let frameCount = 0;

export function updateFPS(currentTime: number) {
  let fps = 0;
  frameCount++;

  if (currentTime - endTime >= 1000) {
    const fpsElement = getElementById("fps");
    fps = frameCount;
    fpsElement.innerText = "FPS : " + fps;
    endTime = currentTime;
    frameCount = 0;
  }
}
