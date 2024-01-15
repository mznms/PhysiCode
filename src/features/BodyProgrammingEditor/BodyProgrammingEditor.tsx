"use client";
import { Cameras } from "../Cameras/Cameras";
import { Result } from "./Result/Result";
import { useBodyProgrammingEditor } from "./bodyProgrammingEditorContext";

export function BodyProgrammingEditor() {
  const { isOpen } = useBodyProgrammingEditor();

  return (
    <>
      {isOpen && (
        <div className="lg:flex gap-2 items-stretch mx-4">
          <Cameras />
          <Result />
        </div>
      )}
    </>
  );
}
