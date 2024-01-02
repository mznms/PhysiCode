import {
  isCanvasElement,
  isCanvasRenderingContext2D,
  isVideoElement,
} from "./elementTypeCheck";

export function getVideoElement() {
  const video = document.getElementById("video");
  if (!isVideoElement(video)) {
    throw new Error("Video element not found or is not a video element");
  }
  return video;
}

export function getCanvasElement() {
  const canvas = document.getElementById("canvas");

  if (!isCanvasElement(canvas)) {
    throw new Error("Canvas element not found or is not a canvas element");
  }
  return canvas;
}

export function getCanvasContext(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");

  if (!isCanvasRenderingContext2D(context)) {
    throw new Error("Unable to get 2D context");
  }

  return context;
}

export function getElementById(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id:${id} not found`);
  }
  return element;
}
