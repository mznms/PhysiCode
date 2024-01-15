import { MutableRefObject } from "react";
import { getCharacterCorrespondsToCurrentPose } from "./getCharacterCorrespondsToCurrentPose";
import { clearCanvas } from "./scripts/lib/canvas/clearCanvas";
import { getElementById } from "./scripts/utils/getHTMLElement";

let endTime = 0;
let frameCount = 0;

export async function animate(
  currentTime: number,
  code: string,
  setCode: (code: string) => void,
  frameId: MutableRefObject<number>,
) {
  let fps = 0;
  frameCount++;

  if (currentTime - endTime >= 1000) {
    const fpsElement = getElementById("fps");
    fps = frameCount;
    fpsElement.innerText = "FPS : " + fps;
    endTime = currentTime;
    frameCount = 0;
  }

  clearCanvas();

  const characterCorrespondsToCurrentPose =
    await getCharacterCorrespondsToCurrentPose();

  if (characterCorrespondsToCurrentPose) {
    if (characterCorrespondsToCurrentPose === "backspace") {
      setCode(code.slice(0, -1));
    } else {
      setCode(code + characterCorrespondsToCurrentPose);
    }
  }

  frameId.current = requestAnimationFrame((currentTime) =>
    animate(currentTime, code, setCode, frameId),
  );
  return frameId;
}
