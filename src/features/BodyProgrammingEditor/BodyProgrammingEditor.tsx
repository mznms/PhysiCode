import { Textarea } from "@nextui-org/input";
import { Cameras } from "../Cameras/Cameras";

export function BodyProgrammingEditor() {
  return (
    <div className="sm:flex gap-2 items-stretch">
      <Cameras />
      <Textarea
        label="ソースコード"
        placeholder="Enter your description"
        disableAnimation
        disableAutosize
        classNames={{
          base: "absolute bottom-0 left-0 z-50 w-screen text-xl sm:relative sm:w-80",
          inputWrapper: "sm:flex-grow rounded-none sm:rounded-2xl",
          input: "h-[20vh] sm:h-full",
        }}
      />
    </div>
  );
}
