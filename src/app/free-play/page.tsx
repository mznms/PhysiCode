import { Cameras } from "@/features/Cameras/Cameras";
import { Code } from "@/features/Code/Code";
import { Input } from "@/features/Input/Input";

export default function FreePlay() {
  return (
    <main className="max-w-screen-xl mx-auto">
      <div className="mx-2 flex flex-col gap-6">
        <Code />
        <Input />
        <Cameras />
      </div>
    </main>
  );
}
