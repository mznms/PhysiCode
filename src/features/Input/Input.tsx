import { Textarea } from "@nextui-org/input";
import { useInput } from "./inputContext";

export function Input() {
  const { input, setInput } = useInput();
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xl">入力</div>
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
  );
}
