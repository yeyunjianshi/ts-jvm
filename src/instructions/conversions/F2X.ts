import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class F2D extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popFloat() as Float
    stack.push(d)
  }
}

export class F2I extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popFloat()
    stack.push(Math.floor(d))
  }
}

export class F2L extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popFloat()
    stack.push(BigInt(d))
  }
}
