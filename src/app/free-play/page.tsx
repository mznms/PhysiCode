import { Code } from "@nextui-org/code";
import { Cameras } from "@/features/Cameras/Cameras";
import { Input } from "@/features/Input/Input";

export default function FreePlay() {
  return (
    <main>
      <div className="mx-2 flex flex-col gap-6">
        <Code />
        <Input />
        <Cameras />
      </div>
    </main>
  );
}
