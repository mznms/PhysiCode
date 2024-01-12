"use client";
import { useCamera } from "./useCamera";

export function Cameras() {
  const { stopCamera } = useCamera();

  return (
    <div id="container" className="absolute top-0 left-0 z-50 sm:relative">
      <video
        id="video"
        className="scale-x-[-1] w-screen h-[80vh] object-cover sm:object-fill sm:w-auto sm:h-auto"
      />
      <canvas
        id="canvas"
        className="absolute top-0 left-0 scale-x-[-1] w-screen h-[80vh] object-cover sm:object-fill sm:w-auto sm:h-auto"
      />
      <div id="fps" className="absolute top-0 left-1">
        FPS : 0
      </div>
      <button onClick={stopCamera} className="absolute top-4 right-4 text-4xl">
        x
      </button>
    </div>
  );
}
