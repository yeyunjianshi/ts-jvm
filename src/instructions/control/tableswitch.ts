import { Frame } from 'src/rtda/Frame'
import { BytecodeReader } from '../base/BytecodeReader'
import { Instruction, branch } from '../base/Instruction'

export class TableSwitch extends Instruction {
  defaultOffset: Int32 = 0
  low: Int32 = 0
  high: Int32 = 0
  jumpOffses: Int32[] = []

  fetchOperand(reader: BytecodeReader): void {
    reader.skipPadding()
    this.defaultOffset = reader.readInt32()
    this.low = reader.readInt32()
    this.high = reader.readInt32()
    const jumpOffsesCount = this.high - this.low + 1
    this.jumpOffses = reader.readInt32s(jumpOffsesCount)
  }

  execute(frame: Frame): void {
    const index = frame.operandStack.popInt()

    let offset = 0
    if (index >= this.low && index <= this.high) {
      offset = this.jumpOffses[index - this.low]
    } else {
      offset = this.defaultOffset
    }
    branch(frame, offset)
  }
}
