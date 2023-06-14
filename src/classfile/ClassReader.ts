export class Reader {
  protected _offset = 0
  protected _buffer: Buffer

  constructor(buffer: Buffer) {
    this._buffer = buffer
  }

  readInt8() {
    const val = this._buffer.readInt8(this._offset)
    this._offset++
    return val
  }

  readUInt8() {
    const val = this._buffer.readUInt8(this._offset)
    this._offset++
    return val
  }

  readInt16() {
    const val = this._buffer.readInt16BE(this._offset)
    this._offset += 2
    return val
  }

  readUInt16() {
    const val = this._buffer.readUint16BE(this._offset)
    this._offset += 2
    return val
  }

  readInt32() {
    const val = this._buffer.readInt32BE(this._offset)
    this._offset += 4
    return val
  }

  readUInt32() {
    const val = this._buffer.readUint32BE(this._offset)
    this._offset += 4
    return val
  }

  readInt64() {
    const val = this._buffer.readBigInt64BE(this._offset)
    this._offset += 8
    return val
  }

  readUInt64() {
    const val = this._buffer.readBigUint64BE(this._offset)
    this._offset += 8
    return val
  }

  readFloat(): Float {
    const val = this._buffer.readFloatBE(this._offset)
    this._offset += 4
    return val
  }

  readDouble(): Double {
    const val = this._buffer.readDoubleBE(this._offset)
    this._offset += 8
    return val
  }

  readUInt16s(): UInt16[] {
    const len = this.readUInt16()
    return Array.from({ length: len }, () => this.readUInt16())
  }

  readInt32s(len: number | undefined): UInt32[] {
    if (len === undefined) len = this.readUInt16()
    return Array.from({ length: len }, () => this.readInt32())
  }

  readBytes(len: UInt32): UInt8[] {
    return Array.from({ length: len }, () => this.readUInt8())
  }
}

export class ClassReader extends Reader {}
