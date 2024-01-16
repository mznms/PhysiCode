"use client";
import { Spinner } from "@nextui-org/react";
import { Camera } from "../Camera/Camera";
import { usePoseDetection } from "../Camera/usePoseDetection";
import { Result } from "./Result/Result";

export function BodyProgrammingEditor() {
  const { isLoading, videoRef } = usePoseDetection();

  return (
    <>
      {isLoading && (
        <div className="absolute z-50 top-[64px] left-0 w-full h-full bg-background">
          <Spinner className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
        </div>
      )}
      <div
        className={`lg:flex gap-2 items-stretch lg:mx-4 ${
          isLoading && "hidden"
        }`}
      >
        <Camera ref={videoRef} />
        <Result />
      </div>
    </>
  );
}
