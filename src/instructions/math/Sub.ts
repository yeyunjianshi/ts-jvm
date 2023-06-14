import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class DSub extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popDouble()
    const v2 = stack.popDouble()
    const result = v1 - v2
    stack.push(result)
  }
}

export class FSub extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popFloat()
    const v2 = stack.popFloat()
    const result = v1 - v2
    stack.push(result)
  }
}

export class ISub extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popInt()
    const v2 = stack.popInt()
    const result = v1 - v2
    stack.push(result)
  }
}

export class LSub extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popLong()
    const v2 = stack.popLong()
    const result = v1 - v2
    stack.push(result)
  }
}
