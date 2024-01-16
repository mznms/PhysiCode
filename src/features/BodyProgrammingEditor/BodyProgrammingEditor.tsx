"use client";
import { Camera } from "../Camera/Camera";
import { Interpreter } from "../Interpreter/Interpreter";
import { Result } from "./Result/Result";
import { useBodyProgrammingEditor } from "./bodyProgrammingEditorContext";

export function BodyProgrammingEditor() {
  const { isOpen } = useBodyProgrammingEditor();

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
