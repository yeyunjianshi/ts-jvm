import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'
import { convert } from 'src/utils'

export class I2B extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popInt()
    stack.push(convert(d, Int8Array))
  }
}

export class I2C extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popInt()
    stack.push(convert(d, Uint16Array))
  }
}

export class I2F extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popInt() as Float
    stack.push(d)
  }
}

export class I2D extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popInt() as Double
    stack.push(d)
  }
}

export class I2L extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popInt()
    stack.push(BigInt(d))
  }
}
