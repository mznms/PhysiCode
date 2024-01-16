"use client";
import { Button } from "@nextui-org/react";
import { useMemory } from "./memoryProvider";

export function Memory() {
  const { memory, setMemory } = useMemory();

  const onlyFirst64 = memory.slice(0, 64);
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xl">メモリー</div>
      <div className="flex flex-wrap">
        {...onlyFirst64.map((value, i) => {
          return (
            <span key={i} className="px-2">
              {value}
            </span>
          );
        })}
      </div>
      <Button onClick={() => setMemory(memory.map((v) => v + 1))}>+1</Button>
    </div>
  );
}
