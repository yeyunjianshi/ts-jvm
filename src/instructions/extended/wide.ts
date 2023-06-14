import { BytecodeReader } from '../base/BytecodeReader'
import { Index8Instruction, Instruction } from '../base/Instruction'
import { ALoad } from '../loads/ALoad'
import { DLoad } from '../loads/DLoad'
import { FLoad } from '../loads/FLoad'
import { ILoad } from '../loads/ILoad'
import { LLoad } from '../loads/LLoad'
import { IInc } from '../math/IInc'
import { AStore } from '../store/AStore'
import { DStore } from '../store/DStore'
import { FStore } from '../store/FStore'
import { IStore } from '../store/IStore'
import { LStore } from '../store/LStore'

export class Wide extends Instruction {
  modifiedInstruction!: Instruction
  fetchOperand(reader: BytecodeReader): void {
    const opcode = reader.readUInt8()
    let inst: Index8Instruction
    switch (opcode) {
      case 0x15: {
        inst = new ILoad()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x16: {
        inst = new LLoad()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x17: {
        inst = new FLoad()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x18: {
        inst = new DLoad()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x19: {
        inst = new ALoad()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x36: {
        inst = new IStore()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x37: {
        inst = new LStore()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x38: {
        inst = new FStore()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x39: {
        inst = new DStore()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x3a: {
        inst = new AStore()
        inst.index = reader.readUInt16()
        this.modifiedInstruction = inst
        break
      }
      case 0x84: {
        const innc = new IInc()
        innc.index = reader.readUInt16()
        innc.constVal = reader.readInt16()
        this.modifiedInstruction = innc
        break
      }
      case 0xa9: {
        // ret
        throw new Error('Unsupported opcode:{ 0xa9!')
      }
    }
  }
}
