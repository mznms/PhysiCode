import {
  getCanvasContext,
  getCanvasElement,
} from "@/features/Cameras/scripts/utils/getHTMLElement";

export function clearCanvas() {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const context = getCanvasContext(canvas);

  context.clearRect(0, 0, canvas.width, canvas.height);
}
