"use client";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useInterpreter } from "../Interpreter/useInterpreter";
import { PauseIcon } from "../ui/Icon/PauseIcon";
import { PlayArrowIcon } from "../ui/Icon/PlayArrowIcon";
import { SettingsIcon } from "../ui/Icon/SettingsIcon";

export function Code() {
  const { runInterpreter, code, setCode, isRunning } = useInterpreter();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="text-xl">ソースコード</div>
        <div className="flex gap-2">
          <Button
            endContent={<PlayArrowIcon />}
            isIconOnly={true}
            onClick={runInterpreter}
            isDisabled={isRunning}
          />
          <PauseIcon />
          <SettingsIcon />
        </div>
      </div>
      <Textarea value={code} onChange={(e) => setCode(e.target.value)} />
    </div>
  );
}
