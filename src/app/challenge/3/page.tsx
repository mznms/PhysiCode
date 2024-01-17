"use client";
import { useEffect } from "react";
import { BodyProgrammingEditor } from "@/features/BodyProgrammingEditor/BodyProgrammingEditor";
import { useBodyProgrammingEditor } from "@/features/BodyProgrammingEditor/bodyProgrammingEditorContext";
import { useCode } from "@/features/Code/codeContext";
import { Interpreter } from "@/features/Interpreter/Interpreter";
import { Question } from "@/features/Question/Question";

export default function Question3Page() {
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
            id={3}
            title="入力された数を 2 倍して出力しよう！
            ただし入力 k: 0 <= k <= 4"
            inputExample="4"
            outputExample="8"
            answer=",------------------------------------------------[->++[>+<-]<]>>++++++++++++++++++++++++++++++++++++++++++++++++."
          >
            <Interpreter />
          </Question>
        </div>
      )}
    </main>
  );
}
