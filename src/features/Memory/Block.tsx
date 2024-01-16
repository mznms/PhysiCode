type Props = {
  value: number;
  isFocused: boolean;
};

export function Block({ value, isFocused }: Props) {
  return (
    <span key={value} className={`mr-2 ${isFocused && "bg-orange-400"}`}>
      {String(value).padStart(4, "0")}
    </span>
  );
}
