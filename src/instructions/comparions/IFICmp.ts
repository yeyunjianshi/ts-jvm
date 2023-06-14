import { Frame } from 'src/rtda/Frame'
import { BranchInstruction, branch } from '../base/Instruction'

export class IFICmpEQ extends BranchInstruction {
  execute(frame: Frame): void {
    const [v1, v2] = icmpPop(frame)
    if (v1 === v2) branch(frame, this.offset)
  }
}

export class IFICmpNE extends BranchInstruction {
  execute(frame: Frame): void {
    const [v1, v2] = icmpPop(frame)
    if (v1 !== v2) branch(frame, this.offset)
  }
}

export class IFICmpLT extends BranchInstruction {
  execute(frame: Frame): void {
    const [v1, v2] = icmpPop(frame)
    if (v1 < v2) branch(frame, this.offset)
  }
}

export class IFICmpLE extends BranchInstruction {
  execute(frame: Frame): void {
    const [v1, v2] = icmpPop(frame)
    if (v1 <= v2) branch(frame, this.offset)
  }
}

export class IFICmpGT extends BranchInstruction {
  execute(frame: Frame): void {
    const [v1, v2] = icmpPop(frame)
    if (v1 > v2) branch(frame, this.offset)
  }
}

export class IFICmpGE extends BranchInstruction {
  execute(frame: Frame): void {
    const [v1, v2] = icmpPop(frame)
    if (v1 >= v2) branch(frame, this.offset)
  }
}

function icmpPop(frame: Frame) {
  const stack = frame.operandStack
  const v2 = stack.popInt()
  const v1 = stack.popInt()
  return [v1, v2]
}
