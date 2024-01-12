"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CodeProvider } from "@/features/Code/codeContext";
import { MemoryProvider } from "@/features/Memory/memoryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <CodeProvider>
        <MemoryProvider>{children}</MemoryProvider>
      </CodeProvider>
    </NextUIProvider>
  );
}
