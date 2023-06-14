import { Frame } from 'src/rtda/Frame'
import { BytecodeReader } from '../base/BytecodeReader'
import { Instruction, branch } from '../base/Instruction'

/*
lookupswitch
<0-3 byte pad>
defaultbyte1
defaultbyte2
defaultbyte3
defaultbyte4
npairs1
npairs2
npairs3
npairs4
match-offset pairs...
*/
// Access jump table by key match and jump
export class LookupSwitch extends Instruction {
  defaultOffset: Int32 = 0
  npairs: Int32 = 0
  matchOffets: Int32[] = []

  fetchOperand(reader: BytecodeReader): void {
    reader.skipPadding()
    this.defaultOffset = reader.readInt32()
    this.npairs = reader.readInt32()
    this.matchOffets = reader.readInt32s(this.npairs * 2)
  }

  execute(frame: Frame): void {
    const key = frame.operandStack.popInt()
    for (let i = 0; i < this.npairs * 2; i += 2) {
      if (this.matchOffets[i] === key) {
        const offset = this.matchOffets[i + 1]
        branch(frame, offset)
        return
      }
    }
    branch(frame, this.defaultOffset)
  }
}
