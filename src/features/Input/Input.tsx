import { Textarea } from "@nextui-org/input";

export function Input() {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xl">入力</div>
      <Textarea />
    </div>
  );
}
