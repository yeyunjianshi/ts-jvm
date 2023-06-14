import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'
import { convert } from 'src/utils'

export class L2F extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popLong()
    stack.push(Number(d))
  }
}

export class L2D extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popLong()
    stack.push(Number(d))
  }
}

export class L2I extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const val = stack.popLong()
    stack.push(convert(val, Int32Array))
  }
}
