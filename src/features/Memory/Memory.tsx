"use client";
import { Block } from "./Block";
import { useMemory } from "./memoryProvider";

export function Memory() {
  const { memory } = useMemory();
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xl">メモリー</div>
      <div className="flex flex-wrap">
        {...memory.map(({ isFocused, value }, i) => {
          return <Block key={i} value={value} isFocused={isFocused} />;
        })}
      </div>
    </div>
  );
}
