"use client";
import { useCamera } from "./useCamera";

export function Cameras() {
  useCamera();
  return (
    <div>
      <h1>tensorflow.js test</h1>
      <h3 id="fps">FPS : 0</h3>
      <div id="container" className="relative">
        <video id="video" className="invisible"></video>
        <canvas
          id="camera-canvas"
          className="absolute top-0 left-0 z-0 scale-x-[-1]"
        ></canvas>
        <canvas
          id="canvas"
          className="absolute top-0 left-0 z-10 scale-x-[-1]"
        ></canvas>
      </div>
    </div>
  );
}
