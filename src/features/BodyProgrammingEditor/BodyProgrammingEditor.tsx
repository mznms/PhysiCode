"use client";
import { BF } from "../BF/BF";
import { Cameras } from "../Cameras/Cameras";
import { Result } from "./Result/Result";
import { useBodyProgrammingEditor } from "./bodyProgrammingEditorContext";

export function BodyProgrammingEditor() {
  const { isOpen } = useBodyProgrammingEditor();

  return (
    <>
      {isOpen ? (
        <div className="lg:flex gap-2 items-stretch lg:mx-4">
          <Cameras />
          <Result />
        </div>
      ) : (
        <div className="px-4 mx-auto">
          <BF />
        </div>
      )}
    </>
  );
}
