import { Reader } from 'src/classfile/ClassReader'

export class BytecodeReader extends Reader {
  get pc() {
    return this._offset
  }

  reset(data: Buffer, pc: number) {
    this._buffer = data
    this._offset = pc
  }

  skipPadding() {
    while (this.pc % 4 !== 0) {
      this.readUInt8()
    }
  }
}
