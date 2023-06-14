import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class IOR extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popInt()
    const v1 = stack.popInt()
    const result = v1 | v2
    stack.push(result)
  }
}

export class LOR extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popLong()
    const v1 = stack.popLong()
    const result = v1 | v2
    stack.push(result)
  }
}
