import { Frame } from 'src/rtda/Frame'
import { BranchInstruction, branch } from '../base/Instruction'

export class IFACmpEQ extends BranchInstruction {
  execute(frame: Frame): void {
    if (acmp(frame)) branch(frame, this.offset)
  }
}
export class IFACmpNE extends BranchInstruction {
  execute(frame: Frame): void {
    if (!acmp(frame)) branch(frame, this.offset)
  }
}

function acmp(frame: Frame) {
  const stack = frame.operandStack
  const ref2 = stack.popRef()
  const ref1 = stack.popRef()
  return ref1 === ref2
}
