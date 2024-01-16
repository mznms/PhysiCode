"use client";
import { useOutput } from "./outputContext";

export function Output() {
  const { output } = useOutput();
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xl">結果</div>
      <div>{output}</div>
    </div>
  );
}
