import { Frame } from 'src/rtda/Frame'
import { BytecodeReader } from '../base/BytecodeReader'
import { Instruction } from '../base/Instruction'

export class IInc extends Instruction {
  index = 0
  constVal = 0

  fetchOperand(reader: BytecodeReader): void {
    this.index = reader.readUInt8()
    this.constVal = reader.readInt8()
  }

  execute(frame: Frame): void {
    const localVars = frame.localVars
    let val = localVars.getInt(this.index) as Int32
    val += this.constVal
    localVars.set(this.index, val)
  }
}
