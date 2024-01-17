"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Divider } from "@nextui-org/divider";

type Props = {
  id: number;
  title: string;
  inputExample: string;
  outputExample: string;
  answer: string;
  children?: React.ReactNode;
};

export function Question({
  id,
  title,
  inputExample,
  outputExample,
  answer,
  children,
}: Props) {
  return (
    <div>
      <h1 className="text-4xl">チャレンジ{id}</h1>
      <div className="my-2">{title}</div>
      <div className="my-2">
        <div className="my-2">入力例</div>
        <div>{inputExample}</div>
      </div>
      <Divider className="my-2" />
      <div>
        <div className="my-2">出力例</div>
        <div>{outputExample}</div>
      </div>
      <Divider className="my-2" />
      {children}
      <Divider className="my-2" />
      <Accordion>
        <AccordionItem
          key="1"
          aria-label={`チャレンジ${id} 解答`}
          title={`チャレンジ${id} 解答`}
        >
          {answer}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
