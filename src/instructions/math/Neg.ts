import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class DNeg extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const val = stack.popDouble()
    stack.push(-val)
  }
}

export class FNeg extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const val = stack.popFloat()
    stack.push(-val)
  }
}

export class INeg extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const val = stack.popInt()
    stack.push(-val)
  }
}

export class LNeg extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const val = stack.popLong()
    stack.push(-val)
  }
}
