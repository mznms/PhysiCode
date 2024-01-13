import Image from "next/image";

type Props = {
  size?: number;
  width?: number;
  height?: number;
};
export function RunningManIcon({ size, width, height }: Props) {
  return (
    <Image
      src="/running_man.svg"
      alt="Man Running"
      width={size || width || 40}
      height={size || height || 40}
    />
  );
}
