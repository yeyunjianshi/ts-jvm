import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

/*
bottom -> top
[...][c][b][a]
             \_
               |
               V
[...][c][b][a][a]
*/
export class Dup extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const slot = stack.popSlot()
    stack.push(slot)
    stack.push(slot)
  }
}

/*
bottom -> top
[...][c][b][a]
          __/
         |
         V
[...][c][a][b][a]
*/
export class DupX1 extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const slot1 = stack.popSlot()
    const slot2 = stack.popSlot()
    stack.push(slot1)
    stack.push(slot2)
    stack.push(slot1)
  }
}

/*
bottom -> top
[...][c][b][a]
       _____/
      |
      V
[...][a][c][b][a]
*/
export class DupX2 extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const slot1 = stack.popSlot()
    const slot2 = stack.popSlot()
    const slot3 = stack.popSlot()
    stack.push(slot1)
    stack.push(slot3)
    stack.push(slot2)
    stack.push(slot1)
  }
}

/*
bottom -> top
[...][c][b][a]____
          \____   |
               |  |
               V  V
[...][c][b][a][b][a]
*/
export class Dup2 extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const slot1 = stack.popSlot()
    const slot2 = stack.popSlot()
    stack.push(slot2)
    stack.push(slot1)
    stack.push(slot2)
    stack.push(slot1)
  }
}

/*
bottom -> top
[...][c][b][a]
       _/ __/
      |  |
      V  V
[...][b][a][c][b][a]
*/
export class Dup2X1 extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const slot1 = stack.popSlot()
    const slot2 = stack.popSlot()
    const slot3 = stack.popSlot()
    stack.push(slot2)
    stack.push(slot1)
    stack.push(slot3)
    stack.push(slot2)
    stack.push(slot1)
  }
}

/*
bottom -> top
[...][d][c][b][a]
       ____/ __/
      |   __/
      V  V
[...][b][a][d][c][b][a]
*/
export class Dup2X2 extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const slot1 = stack.popSlot()
    const slot2 = stack.popSlot()
    const slot3 = stack.popSlot()
    const slot4 = stack.popSlot()
    stack.push(slot2)
    stack.push(slot1)
    stack.push(slot4)
    stack.push(slot3)
    stack.push(slot2)
    stack.push(slot1)
  }
}
