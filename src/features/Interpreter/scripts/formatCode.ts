/**
 * BF コードから連続した同一トークンを省略記法によりフォーマットする。
 *   e.g.) +++ -> +(3)
 * 何文字以上連続したとき省略記法を用いるかは引数により与えられる。
 * これを与えない場合はデフォルトで 2 が指定されている（すなわち同一文字の連続を一切許さない）。
 * @param code フォーマットしたい BF コード
 * @param threshold 閾値（この値以上連続したトークンがあれば省略する）
 * @returns フォーマットされた BF コード
 */
export function formatCode(code: string, threshold: number = 2) {
  if (threshold < 2) threshold = 2;

  let formattedCode = "";
  let count = 1;

  for (let i = 0; i < code.length; i++) {
    if (code[i] === code[i + 1]) {
      count++;
    } else {
      if (count >= threshold) {
        formattedCode += `${code[i]}(${count})`;
      } else {
        for (let j = 0; j < count; j++) {
          formattedCode += code[i];
        }
      }
      count = 1;
    }
  }

  return formattedCode;
}
