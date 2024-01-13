export class UnclosedBracketError extends Error {}
export class TimeOutError extends Error {}
export class MemoryBoundError extends Error {}

/**
 * Brainfuck の処理系本体
 * bf 20041219 を参考に実装
 * - メモリの各セルは 0-255 の値をとる．0 に対するデクリメントは 255，255 に対するインクリメントは 0 となる．
 * - 入力読み込み時，EOF の場合は 255 をとる．
 * - `[` から `]` へジャンプ時，対応するものが見つからなければ `UnclosedBracketError` をスロー
 * - `]` から `[` へジャンプ時，対応するものが見つからなければ コード先頭へ代わりにジャンプ
 * - メモリは 9999 bytes (0-9998)
 * - メモリの領域外アクセスは `MemoryBoundError` をスロー
 * - 実行時間が 2 秒を超えた場合は `TimeOutError` をスロー
 * @param code BF のコード
 * @param input 入力文字列
 * @returns 出力文字列
 */
export function interpret(code: string, input: string): string {
  let mem: number[] = new Array(9999).fill(0);
  let pointer = 0;
  let output = "";

  let codeIndex = 0;
  let inputIndex = 0;

  const startTime = performance.now();

  while (codeIndex < code.length) {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime > 2000) {
      throw new TimeOutError();
    }

    const token = code.charAt(codeIndex);

    switch (token) {
      case ">":
        pointer++;
        if (pointer >= 9999) {
          throw new MemoryBoundError();
        }
        break;

      case "<":
        pointer--;
        if (pointer < 0) {
          throw new MemoryBoundError();
        }
        break;

      case "+":
        mem[pointer] = fixMemValue(++mem[pointer]);
        break;

      case "-":
        mem[pointer] = fixMemValue(--mem[pointer]);
        break;

      case ".":
        output += String.fromCharCode(mem[pointer]);
        break;

      case ",":
        if (inputIndex < input.length) {
          mem[pointer] = fixMemValue(input.charCodeAt(inputIndex++));
        } else {
          mem[pointer] = 255;
        }
        break;

      case "[":
        if (mem[pointer] === 0) {
          let loopDepth = 1;

          while (loopDepth > 0) {
            codeIndex++;
            if (codeIndex >= code.length) {
              throw new UnclosedBracketError();
            }
            if (code.charAt(codeIndex) === "[") {
              loopDepth++;
            } else if (code.charAt(codeIndex) === "]") {
              loopDepth--;
            }
          }
        }
        break;

      case "]":
        if (mem[pointer] !== 0) {
          let loopDepth = 1;

          while (loopDepth > 0) {
            codeIndex--;
            if (codeIndex < 0) {
              codeIndex = 0;
              break;
            }
            if (code.charAt(codeIndex) === "]") {
              loopDepth++;
            } else if (code.charAt(codeIndex) === "[") {
              loopDepth--;
            }
          }
        }
        break;

      default:
        break;
    }

    codeIndex++;
  }

  return output;
}

/**
 * メモリの内容を受け取り，内容が 0-255 の範囲に収まるようにする．
 * もし 0 より小さければ，255 とする．
 * もし 256 より大きければ，0とする．
 * @param content メモリの内容
 * @returns 補正されたメモリの内容
 */
function fixMemValue(content: number): number {
  if (content < 0) {
    return 255;
  } else if (content > 255) {
    return 0;
  }
  return content;
}
