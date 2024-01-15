"use client";
import { useCamera } from "./useCamera";

export function Cameras() {
  const { videoRef } = useCamera();

  return (
    <div id="container" className="relative shrink-0">
      <video
        id="video"
        className="scale-x-[-1] object-cover w-screen h-[100vw] lg:w-[min(calc(100vh-64px-32px),calc(100vw-340px))] lg:h-[min(calc(100vh-64px-32px),calc(100vw-340px))] shrink-0"
        ref={videoRef}
      />
      <canvas
        id="canvas"
        className="absolute top-0 left-0 scale-x-[-1] object-cover w-screen h-[100vw] lg:w-[min(calc(100vh-64px-32px),calc(100vw-340px))] lg:h-[min(calc(100vh-64px-32px),calc(100vw-340px))]"
      />
      <div id="fps" className="absolute top-0 left-1">
        FPS : 0
      </div>
    </div>
  );
}
