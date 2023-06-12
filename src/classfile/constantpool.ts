import { ClassReader } from './ClassReader'
import {
  ConstantClassInfo,
  ConstantDoubleInfo,
  ConstantInfo,
  ConstantLongInfo,
  ConstantNameAndTypeInfo,
  ConstantUtf8Info,
  createConstantInfo,
} from './ConstantInfo'

export class ConstantPool {
  private _reader: ClassReader
  private _infos: Nullable<ConstantInfo>[] = []

  constructor(reader: ClassReader) {
    this._reader = reader
    this.readConstantInfos()
  }

  readConstantInfos() {
    const cpCount = this._reader.readUInt16()
    this._infos = Array.from({ length: cpCount }, () => null)
    for (let i = 1; i < cpCount; i++) {
      this._infos[i] = createConstantInfo(this._reader, this)
      if (
        this._infos[i] instanceof ConstantLongInfo ||
        this._infos[i] instanceof ConstantDoubleInfo
      ) {
        i++
      }
    }
  }

  getNameAndType(index: UInt16) {
    const info = this._infos[index] as ConstantNameAndTypeInfo
    return [info.name, info.descriptor]
  }

  getClassName(index: UInt16) {
    const info = this._infos[index] as ConstantClassInfo
    return info.className
  }

  getUtf8(index: UInt16) {
    const info = this._infos[index] as ConstantUtf8Info
    return info.str
  }
}
