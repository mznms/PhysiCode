import { Code } from "../Code/Code";
import { Input } from "../Input/Input";
import { Memory } from "../Memory/Memory";
import { Output } from "../Output/Output";

export function Interpreter() {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-screen-md">
      <Code />
      <Input />
      <Output />
      <Memory />
    </div>
  );
}
