type Props = {
  id: string;
  title: string;
  answer: string;
};

export function Question({ id, title, answer }: Props) {
  return (
    <div>
      <h1>問題{id}</h1>
      <div>{title}</div>
      <div>{answer}</div>
    </div>
  );
}
