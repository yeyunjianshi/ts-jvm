import { Frame } from 'src/rtda/Frame'
import { BytecodeReader } from '../base/BytecodeReader'
import { Instruction } from '../base/Instruction'

export class BIPush extends Instruction {
  val: Int8 = 0

  fetchOperand(reader: BytecodeReader): void {
    this.val = reader.readInt8()
  }

  execute(frame: Frame): void {
    frame.operandStack.push(this.val)
  }
}

export class SIPush extends Instruction {
  val: Int16 = 0

  fetchOperand(reader: BytecodeReader): void {
    this.val = reader.readInt16()
  }

  execute(frame: Frame): void {
    frame.operandStack.push(this.val)
  }
}
