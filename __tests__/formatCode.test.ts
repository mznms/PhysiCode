import { formatCode } from "../src/features/Interpreter/scripts/formatCode";

describe("正常系テスト", () => {
  test("++ -> +(2)", () => {
    expect(formatCode("++")).toBe("+(2)");
  });

  test(">>> -> >(3)", () => {
    expect(formatCode(">>>")).toBe(">(3)");
  });

  test(">>> (stay)", () => {
    expect(formatCode(">>>", 4)).toBe(">>>");
  });

  test("Hello World!(5)", () => {
    expect(
      formatCode(
        "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.",
        5,
      ),
    ).toBe(
      "+(10)[>+(7)>+(10)>+++>+<<<<-]>++.>+.+(7)..+++.>++.<<+(15).>.+++.-(6).-(8).>+.>.",
    );
  });
});
