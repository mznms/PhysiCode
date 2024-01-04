export function isVideoElement(
  element: HTMLElement | null,
): element is HTMLVideoElement {
  return element !== null && element instanceof HTMLVideoElement;
}

export function isCanvasElement(
  element: HTMLElement | null,
): element is HTMLCanvasElement {
  return element !== null && element instanceof HTMLCanvasElement;
}

export function isCanvasRenderingContext2D(
  context: any,
): context is CanvasRenderingContext2D {
  return context instanceof CanvasRenderingContext2D;
}
