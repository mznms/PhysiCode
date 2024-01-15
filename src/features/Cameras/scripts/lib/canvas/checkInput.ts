import { Keypoint } from "@tensorflow-models/pose-detection/dist/types";
import { Base, Trigger } from "../types/types";
import { contains } from "./virtualButtons";

/**
 * まず機能として、　ベース　トリガー　の２つを受け取る必要がある
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

let latestInput: string | null = null;

function saveChar(c: string) {
  latestInput = c;
}
export function getLatestInput() {
  let copy = latestInput;
  latestInput = null;
  return copy;
}

function makeCheckInput(base: Base, trigger: Trigger, character: string) {
  let triggerFulfilledCurrently = false;

  function checkInput(keypoints: Keypoint[]) {
    // ベースを満たしているか判定
    if (!contains(base.left_ankle, keypoints, "left_ankle")) return null;
    if (!contains(base.right_ankle, keypoints, "right_ankle")) return null;
    let triggerFulfilledPreviously = triggerFulfilledCurrently;
    triggerFulfilledCurrently = false;

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

    if (!satisfyTrigger) return null;

    triggerFulfilledCurrently = true;
    if (!triggerFulfilledPreviously) {
      saveChar(character);
    }
    return null;
  }

  return checkInput;
}

export function makeFuncGetInputs() {
  let buttons = {
    0: { h: 0, w: 2 },
    1: { h: 0, w: 1 },
    2: { h: 0, w: 0 },
    3: { h: 1, w: 2 },
    5: { h: 1, w: 0 },
    6: { h: 2, w: 2 },
    7: { h: 2, w: 1 },
    8: { h: 2, w: 0 },
    null: { h: -1, w: -1 },
  };
  let funcs = [
    makeCheckInput(
      { left_ankle: buttons[6], right_ankle: buttons[8] },
      { left_wrist: buttons[5], right_wrist: buttons[5], needBothHands: false },
      "+",
    ),
    makeCheckInput(
      { left_ankle: buttons[6], right_ankle: buttons[8] },
      { left_wrist: buttons[3], right_wrist: buttons[3], needBothHands: false },
      "-",
    ),
    makeCheckInput(
      { left_ankle: buttons[6], right_ankle: buttons[7] },
      {
        left_wrist: buttons[0],
        right_wrist: buttons["null"],
        needBothHands: false,
      },
      ">",
    ),
    makeCheckInput(
      { left_ankle: buttons[7], right_ankle: buttons[8] },
      {
        left_wrist: buttons["null"],
        right_wrist: buttons[2],
        needBothHands: false,
      },
      "<",
    ),
    makeCheckInput(
      { left_ankle: buttons[8], right_ankle: buttons[7] },
      {
        left_wrist: buttons[0],
        right_wrist: buttons["null"],
        needBothHands: false,
      },
      ".",
    ),
    makeCheckInput(
      { left_ankle: buttons[7], right_ankle: buttons[6] },
      {
        left_wrist: buttons["null"],
        right_wrist: buttons[2],
        needBothHands: false,
      },
      ",",
    ),
    makeCheckInput(
      { left_ankle: buttons[6], right_ankle: buttons[7] },
      {
        left_wrist: buttons["null"],
        right_wrist: buttons[2],
        needBothHands: false,
      },
      "[",
    ),
    makeCheckInput(
      { left_ankle: buttons[7], right_ankle: buttons[8] },
      {
        left_wrist: buttons[0],
        right_wrist: buttons["null"],
        needBothHands: false,
      },
      "]",
    ),
  ];
  function getInputs(keypoints: Keypoint[]) {
    for (const checkInput of funcs) {
      const character = checkInput(keypoints);
      if (character) {
        return character;
      }
    }
    return null;
  }

  return getInputs;
}
