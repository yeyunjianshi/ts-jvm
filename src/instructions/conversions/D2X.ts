import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

export class D2F extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popDouble() as Float
    stack.push(d)
  }
}

export class D2I extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popDouble()
    stack.push(Math.floor(d))
  }
}

export class D2L extends Instruction {
  execute(frame: Frame): void {
    const stack = frame.operandStack
    const d = stack.popDouble()
    stack.push(BigInt(d))
  }
}
