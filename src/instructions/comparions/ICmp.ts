import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class ICmp extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popLong()
    const v1 = stack.popLong()
    if (v1 > v2) stack.push(1)
    else if (v1 === v2) stack.push(0)
    else stack.push(-1)
  }
}
