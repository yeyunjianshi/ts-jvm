import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class ISHL extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popInt()
    const v1 = stack.popInt()
    const result = v1 << (v2 & 0x1f)
    stack.push(result)
  }
}

export class ISHR extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popInt()
    const v1 = stack.popInt()
    const result = v1 >> (v2 & 0x1f)
    stack.push(result)
  }
}

export class IUSHR extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popInt()
    const v1 = stack.popInt()
    const result = v1 >>> (v2 & 0x1f)
    stack.push(result)
  }
}

export class LSHL extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popInt()
    const v1 = stack.popLong()
    const result = v1 << (v2 & 0x3f)
    stack.push(result)
  }
}

export class LSHR extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v2 = stack.popInt()
    const v1 = stack.popLong()
    const result = v1 >> (v2 & 0x3f)
    stack.push(result)
  }
}

export class LUSHR extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const v1 = stack.popInt()
    const v2 = stack.popLong()
    const sign = v1 >= 0
    const absV1 = Math.abs(v1)
    const result = absV1 >> (v2 & 0x3f)
    stack.push(sign ? result : -result)
  }
}
