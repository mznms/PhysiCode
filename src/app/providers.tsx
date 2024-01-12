"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CodeProvider } from "@/features/Code/codeContext";
import { MemoryProvider } from "@/features/Memory/memoryProvider";
import { OutputProvider } from "@/features/Output/outputContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <CodeProvider>
        <MemoryProvider>
          <OutputProvider>{children}</OutputProvider>
        </MemoryProvider>
      </CodeProvider>
    </NextUIProvider>
  );
}
