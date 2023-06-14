import { Frame } from 'src/rtda/Frame'
import { BytecodeReader } from '../base/BytecodeReader'
import { Instruction, branch } from '../base/Instruction'

export class GotoW extends Instruction {
  offset = 0

  fetchOperand(reader: BytecodeReader): void {
    this.offset = reader.readInt32()
  }

  execute(frame: Frame): void {
    branch(frame, this.offset)
  }
}
