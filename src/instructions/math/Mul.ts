import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class DMul extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popDouble()
    const v2 = stack.popDouble()
    const result = v1 * v2
    stack.push(result)
  }
}

export class FMul extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popFloat()
    const v2 = stack.popFloat()
    const result = v1 * v2
    stack.push(result)
  }
}

export class IMul extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popInt()
    const v2 = stack.popInt()
    const result = v1 * v2
    stack.push(result)
  }
}

export class LMul extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popLong()
    const v2 = stack.popLong()
    const result = v1 * v2
    stack.push(result)
  }
}
