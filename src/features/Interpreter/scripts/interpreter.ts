export class UnclosedBracketError extends Error {}
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
 */
export class BFInterpreter {
  private readonly code: string;
  private readonly input: string;

  private mem: number[]; // メモリ
  private pointer: number; // メモリのどこを現在指しているか
  private output: string; // 出力文字列
  private codeIndex: number; // コードの何文字目を現在指しているか
  private inputIndex: number; // 入力文字列の何文字目を現在指しているか

  private stepCount: number; // ステップ実行が何回成功したか

  /**
   * BF のコードと入力文字列をセット
   * @param code BF のコード
   * @param input 入力
   */
  constructor(code: string, input: string) {
    this.code = code;
    this.input = input;

    this.mem = new Array(9999).fill(0);
    this.pointer = 0;
    this.output = "";
    this.codeIndex = 0;
    this.inputIndex = 0;

    this.stepCount = 0;
  }

  /**
   * BF をステップ実行する．
   * このメソッドを呼び出すたび，トークンを 1 つ読み出し，メモリと出力の状態を書き換える．
   * @returns
   */
  stepwiseExecution(): void {
    if (this.codeIndex >= this.code.length) {
      return;
    }

    const token = this.code.charAt(this.codeIndex);

    switch (token) {
      case ">":
        this.pointer++;
        if (this.pointer >= 9999) {
          throw new MemoryBoundError();
        }
        break;

      case "<":
        this.pointer--;
        if (this.pointer < 0) {
          throw new MemoryBoundError();
        }
        break;

      case "+":
        this.mem[this.pointer] = fixMemValue(++this.mem[this.pointer]);
        break;

      case "-":
        this.mem[this.pointer] = fixMemValue(--this.mem[this.pointer]);
        break;

      case ".":
        this.output += String.fromCharCode(this.mem[this.pointer]);
        break;

      case ",":
        if (this.inputIndex < this.input.length) {
          this.mem[this.pointer] = fixMemValue(
            this.input.charCodeAt(this.inputIndex++),
          );
        } else {
          this.mem[this.pointer] = 255;
        }
        break;

      case "[":
        if (this.mem[this.pointer] === 0) {
          let loopDepth = 1;

          while (loopDepth > 0) {
            this.codeIndex++;
            if (this.codeIndex >= this.code.length) {
              throw new UnclosedBracketError();
            }
            if (this.code.charAt(this.codeIndex) === "[") {
              loopDepth++;
            } else if (this.code.charAt(this.codeIndex) === "]") {
              loopDepth--;
            }
          }
        }
        break;

      case "]":
        if (this.mem[this.pointer] !== 0) {
          let loopDepth = 1;

          while (loopDepth > 0) {
            this.codeIndex--;
            if (this.codeIndex < 0) {
              this.codeIndex = 0;
              break;
            }
            if (this.code.charAt(this.codeIndex) === "]") {
              loopDepth++;
            } else if (this.code.charAt(this.codeIndex) === "[") {
              loopDepth--;
            }
          }
        }
        break;

      default:
        break;
    }

    this.codeIndex++;

    this.stepCount++;

    return;
  }

  /**
   * 現在バッファされている出力文字列を出力する．
   * @returns 現在の出力
   */
  getOutput(): string {
    return this.output;
  }

  /**
   * 現在のメモリをダンプする．
   * @returns 現在のメモリ
   */
  getMemDump(): number[] {
    return this.mem;
  }

  /**
   * 現在のポインタ位置（メモリ配列の何番目を指しているか）を出力する．
   * @returns 現在のポインタ位置
   */
  getPointer(): number {
    return this.pointer;
  }

  /**
   * 現在までに何回ステップ実行されたか（＝ `stepwiseExecution` により何回トークンを読んだか）を出力する．
   * @returns 現在のステップ実行回数
   */
  getStepCount(): number {
    return this.stepCount;
  }

  /**
   * プログラムが終了状態かどうか通知する．
   * @returns コードの実行が終了であるかの真偽値（`true` なら終了）．
   */
  isHalted(): boolean {
    return this.codeIndex >= this.code.length;
  }
}

/**
 * メモリの内容を受け取り，内容が 0-255 の範囲に収まるようにする．
 * もし 0 より小さければ，255 とする．
 * もし 256 より大きければ，0 とする．
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
