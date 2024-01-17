"use client";
import { useEffect } from "react";
import { BodyProgrammingEditor } from "@/features/BodyProgrammingEditor/BodyProgrammingEditor";
import { useBodyProgrammingEditor } from "@/features/BodyProgrammingEditor/bodyProgrammingEditorContext";
import { useCode } from "@/features/Code/codeContext";
import { Interpreter } from "@/features/Interpreter/Interpreter";
import { Question } from "@/features/Question/Question";

export default function Question2Page() {
  const { isOpen } = useBodyProgrammingEditor();
  const { setCode } = useCode();

  useEffect(() => {
    setCode("");
  }, [setCode]);
  return (
    <main className="max-w-screen-md mx-auto px-4 pb-20">
      {isOpen ? (
        <BodyProgrammingEditor />
      ) : (
        <div>
          <Question
            id={2}
            title="BF と出力しよう"
            inputExample="なし"
            outputExample="BF"
            answer="++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++."
          >
            <Interpreter />
          </Question>
        </div>
      )}
    </main>
  );
}
