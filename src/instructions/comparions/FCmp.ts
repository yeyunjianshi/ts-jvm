import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class FCmpG extends Instruction {
  execute(frame: Frame): void {
    cmp(frame, true)
  }
}

export class FCmpL extends Instruction {
  execute(frame: Frame): void {
    cmp(frame, false)
  }
}

export function cmp(frame: Frame, gFlag: boolean) {
  const stack = frame.operandStack
  const v2 = stack.popDouble()
  const v1 = stack.popDouble()
  if (v1 > v2) {
    stack.push(1)
  } else if (v1 === v2) {
    stack.push(0)
  } else if (v1 < v2) {
    stack.push(-1)
  } else if (gFlag) {
    stack.push(1)
  } else {
    stack.push(-1)
  }
}
