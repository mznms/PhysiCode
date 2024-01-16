"use client";
import { Camera } from "../Camera/Camera";
import { useCamera } from "../Camera/useCamera";
import { Interpreter } from "../Interpreter/Interpreter";
import { Result } from "./Result/Result";

export function BodyProgrammingEditor() {
  const { isOpen } = useCamera();

  return (
    <>
      {isOpen ? (
        <div className="lg:flex gap-2 items-stretch lg:mx-4">
          <Camera />
          <Result />
        </div>
      ) : (
        <div className="px-4 mx-auto">
          <Interpreter />
        </div>
      )}
    </>
  );
}
