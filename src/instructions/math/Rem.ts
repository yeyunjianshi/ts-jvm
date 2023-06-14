import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class DRem extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popDouble()
    const v2 = stack.popDouble()
    const result = v1 % v2
    stack.push(result)
  }
}

export class FRem extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popFloat()
    const v2 = stack.popFloat()
    const result = v1 % v2
    stack.push(result)
  }
}

export class IRem extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popInt()
    const v2 = stack.popInt()
    if (v1 == 0) {
      throw new Error('java.lang.ArithmeticException: % by zero')
    }
    const result = v2 % v1
    stack.push(result)
  }
}

export class LRem extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popLong()
    const v2 = stack.popLong()
    if (v1 == 0) {
      throw new Error('java.lang.ArithmeticException: % by zero')
    }
    const result = v2 % v1
    stack.push(result)
  }
}
