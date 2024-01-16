import { MutableRefObject } from "react";
import { getCharacterCorrespondsToCurrentPose } from "./getCharacterCorrespondsToCurrentPose";
import { clearCanvas } from "./scripts/lib/canvas/clearCanvas";
import { updateFPS } from "./scripts/lib/updateFPS";

export async function animate(
  currentTime: number,
  code: string,
  setCode: (code: string) => void,
  frameId: MutableRefObject<number>,
) {
  updateFPS(currentTime);
  console.log(frameId);

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
