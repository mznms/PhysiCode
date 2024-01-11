"use client";
import { Button } from "@nextui-org/button";
import { useCamera } from "./useCamera";

export function Cameras() {
  const { startCamera, stopCamera } = useCamera();

  return (
    <div>
      <Button color="primary" onClick={startCamera}>
        カメラ起動
      </Button>
      <div id="container" className="hidden">
        <video
          id="video"
          className="absolute top-0 left-0 z-50 scale-x-[-1] w-screen h-[80vh] object-cover"
        ></video>
        <canvas
          id="canvas"
          className="absolute top-0 left-0 z-50 scale-x-[-1] w-screen h-[80vh] object-cover"
        ></canvas>
        <textarea className="absolute bottom-0 left-0 z-50 w-screen h-[20vh] bg-default-100 text-xl" />
        <div id="fps" className="absolute bottom-0 right-1 z-50">
          FPS : 0
        </div>
        <button
          className="absolute top-4 right-4 z-50 text-4xl"
          onClick={stopCamera}
        >
          x
        </button>
      </div>
    </div>
  );
}
