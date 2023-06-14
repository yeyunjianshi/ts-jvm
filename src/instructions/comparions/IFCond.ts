import { Frame } from 'src/rtda/Frame'
import { BranchInstruction, branch } from '../base/Instruction'

export class IFEQ extends BranchInstruction {
  execute(frame: Frame): void {
    const val = frame.operandStack.popInt()
    if (val === 0) branch(frame, this.offset)
  }
}

export class IFNE extends BranchInstruction {
  execute(frame: Frame): void {
    const val = frame.operandStack.popInt()
    if (val !== 0) branch(frame, this.offset)
  }
}

export class IFLT extends BranchInstruction {
  execute(frame: Frame): void {
    const val = frame.operandStack.popInt()
    if (val < 0) branch(frame, this.offset)
  }
}

export class IFLE extends BranchInstruction {
  execute(frame: Frame): void {
    const val = frame.operandStack.popInt()
    if (val <= 0) branch(frame, this.offset)
  }
}

export class IFGT extends BranchInstruction {
  execute(frame: Frame): void {
    const val = frame.operandStack.popInt()
    if (val > 0) branch(frame, this.offset)
  }
}

export class IFGE extends BranchInstruction {
  execute(frame: Frame): void {
    const val = frame.operandStack.popInt()
    if (val >= 0) branch(frame, this.offset)
  }
}
