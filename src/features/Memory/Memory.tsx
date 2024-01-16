"use client";
import { useMemory } from "./memoryContext";

export function Memory() {
  const { memory } = useMemory();

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
    </div>
  );
}
