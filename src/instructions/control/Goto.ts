import { Frame } from 'src/rtda/Frame'
import { BranchInstruction, branch } from '../base/Instruction'

export class Goto extends BranchInstruction {
  execute(frame: Frame): void {
    branch(frame, this.offset)
  }
}
