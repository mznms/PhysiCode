import { useState } from "react";
import { useCode } from "../Code/codeContext";
import { useInput } from "../Input/inputContext";
import { useMemory } from "../Memory/memoryProvider";
import { useOutput } from "../Output/outputContext";
import { BFInterpreter } from "./scripts/interpreter";
import { wait } from "./scripts/wait";

export function useInterpreter() {
  const { code, setCode } = useCode();
  const { input } = useInput();
  const { setOutput } = useOutput();
  const { setMemory } = useMemory();
  const [isRunning, setIsRunning] = useState(false);

  async function runInterpreter() {
    setIsRunning(true);
    const interpreter = new BFInterpreter(code, input);
    while (true) {
      interpreter.stepwiseExecution();
      const currentMemory = [...interpreter.getMemDump()];
      setMemory(currentMemory);

      const currentOutput = interpreter.getOutput();
      setOutput(currentOutput);

      console.log(currentOutput);

      if (interpreter.isHalted()) {
        break;
      }
      await wait(50);
    }
    setIsRunning(false);
  }

  return { runInterpreter, code, setCode, isRunning };
}
