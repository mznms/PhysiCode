"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CameraProvider } from "@/features/Camera/cameraContext";
import { CodeProvider } from "@/features/Code/codeContext";
import { InputProvider } from "@/features/Input/inputContext";
import { MemoryProvider } from "@/features/Memory/memoryContext";
import { OutputProvider } from "@/features/Output/outputContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <CodeProvider>
        <MemoryProvider>
          <OutputProvider>
            <InputProvider>
              <CameraProvider>{children}</CameraProvider>
            </InputProvider>
          </OutputProvider>
        </MemoryProvider>
      </CodeProvider>
    </NextUIProvider>
  );
}
