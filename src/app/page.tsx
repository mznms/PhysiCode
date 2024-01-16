"use client";
import { BodyProgrammingEditor } from "@/features/BodyProgrammingEditor/BodyProgrammingEditor";
import { useBodyProgrammingEditor } from "@/features/BodyProgrammingEditor/bodyProgrammingEditorContext";
import { Interpreter } from "@/features/Interpreter/Interpreter";

export default function FreePlay() {
  const { isOpen } = useBodyProgrammingEditor();
  return (
    <main className="max-w-screen-xl mx-auto">
      {isOpen ? <BodyProgrammingEditor /> : <Interpreter />}
    </main>
  );
}
