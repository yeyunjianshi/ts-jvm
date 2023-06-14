import { Frame } from 'src/rtda/Frame'
import { BytecodeReader } from './BytecodeReader'

export abstract class Instruction {
  fetchOperand(reader: BytecodeReader): void {
    // empty
  }
  execute(frame: Frame): void {
    // empty
  }
}

export class NoOperationInstruction extends Instruction {}

export class BranchInstruction extends Instruction {
  offset: Int16 = 0

  fetchOperand(reader: BytecodeReader): void {
    this.offset = reader.readInt16()
  }
}

export class Index8Instruction extends Instruction {
  index: UInt8 = 0

  fetchOperand(reader: BytecodeReader): void {
    this.index = reader.readUInt8()
  }
}

export class Index16Instruction extends Instruction {
  index: UInt8 = 0

  fetchOperand(reader: BytecodeReader): void {
    this.index = reader.readUInt16()
  }
}

export function branch(frame: Frame, offset: number) {
  const pc = frame.thread.pc
  const nextPC = pc + offset
  frame.nextPC = nextPC
}
