import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class DDiv extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popDouble()
    const v2 = stack.popDouble()
    const result = v1 / v2
    stack.push(result)
  }
}

export class FDiv extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popFloat()
    const v2 = stack.popFloat()
    const result = v1 / v2
    stack.push(result)
  }
}

export class IDiv extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popInt()
    const v2 = stack.popInt()
    if (v1 == 0) {
      throw new Error('java.lang.ArithmeticException: / by zero')
    }
    const result = v2 / v1
    stack.push(result)
  }
}

export class LDiv extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popLong()
    const v2 = stack.popLong()
    if (v1 == 0) {
      throw new Error('java.lang.ArithmeticException: / by zero')
    }
    const result = v2 / v1
    stack.push(result)
  }
}
