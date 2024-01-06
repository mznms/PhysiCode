import { Keypoint } from "@tensorflow-models/pose-detection/dist/types";
import { Button, Base, Trigger } from "../types/types";
import { virtualButtons, contains } from "./virtualButtons";

/**
 * 入力判定をするための関数を作る
 *
 * base : Array<String>
 * trigger  Array<String>
 */

/**
 * まず機能として、　ベース　トリガー　の２つを受け取る必要があるね
 * ベース：　足の位置　どの足がどの場所にあるかを指定する必要がある
 * トリガー：　手の位置　どの手がどの場所に入るかを指定する
 *      type1 片手を特定のエリアに入れる
 *      type2 両手を特定のエリアに入れる
 *      type3 任意の手を特定のエリアに入れる
 *
 * 1.ベースを満たした状態で、
 * 2.1f手前ではトリガーを発動していない状態で、
 * 3.トリガーを発動した場合、
 *  putCharを起動する
 *
 */

function putChar(c: String) {
  console.log(c);
}

function makeFuncCheckInput(base: Base, trigger: Trigger, character: String) {
  let currentState = false;

  function checkInput(keypoints: Keypoint[]) {
    let previousState = currentState;
    currentState = false;
    // ベースを満たしているか判定
    if (!contains(base.left_ankle, keypoints, "left_ankle")) return;
    if (!contains(base.right_ankle, keypoints, "right_ankle")) return;

    // トリガーを満たしているか判定
    let satisfyTrigger = false;
    if (trigger.needBothHands) {
      if (
        contains(trigger.left_wrist, keypoints, "left_wrist") &&
        contains(trigger.right_wrist, keypoints, "right_wrist")
      )
        satisfyTrigger = true;
    } else {
      if (
        contains(trigger.left_wrist, keypoints, "left_wrist") ||
        contains(trigger.right_wrist, keypoints, "right_wrist")
      )
        satisfyTrigger = true;
    }

    if (!satisfyTrigger) return;

    currentState = true;
    if (!previousState) {
      putChar(character);
    }
  }

  return checkInput;
}
