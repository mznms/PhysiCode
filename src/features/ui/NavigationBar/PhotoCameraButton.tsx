"use client";
import { Button } from "@nextui-org/button";
import { PhotoCameraIcon } from "../Icon/PhotoCamera";
import { useBodyProgrammingEditor } from "@/features/BodyProgrammingEditor/bodyProgrammingEditorContext";

export function PhotoCameraButton() {
  const { isOpen, setIsOpen } = useBodyProgrammingEditor();

  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <Button
      onClick={handleClick}
      color="primary"
      endContent={<PhotoCameraIcon size={24} />}
    >
      {isOpen ? "終了" : "カメラ起動"}
    </Button>
  );
}
