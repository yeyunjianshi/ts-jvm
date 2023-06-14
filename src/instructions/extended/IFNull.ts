import { Frame } from 'src/rtda/Frame'
import { BranchInstruction, branch } from '../base/Instruction'

export class IFNull extends BranchInstruction {
  execute(frame: Frame): void {
    const ref = frame.operandStack.popRef()
    if (ref === null) branch(frame, this.offset)
  }
}

export class IFNonNull extends BranchInstruction {
  execute(frame: Frame): void {
    const ref = frame.operandStack.popRef()
    if (ref !== null) branch(frame, this.offset)
  }
}
