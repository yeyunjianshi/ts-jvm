import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class Swap extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const slot1 = stack.popSlot()
    const slot2 = stack.popSlot()
    stack.push(slot2)
    stack.push(slot1)
  }
}
