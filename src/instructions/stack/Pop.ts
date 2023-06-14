import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

/*
bottom -> top
[...][c][b][a]
            |
            V
[...][c][b]
*/
export class Pop extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.popSlot()
  }
}

/*
bottom -> top
[...][c][b][a]
         |  |
         V  V
[...][c]
*/
export class Pop2 extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    stack.popSlot()
    stack.popSlot()
  }
}
