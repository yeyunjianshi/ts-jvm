import { ClassReader } from './ClassReader'
import { ConstantPool } from './ConstantPool'

enum ConstantInfoTag {
  Class = 7,
  Fieldref = 9,
  Methodref = 10,
  InterfaceMethodref = 11,
  String = 8,
  Integer = 3,
  Float = 4,
  Long = 5,
  Double = 6,
  NameAndType = 12,
  Utf8 = 1,
  MethodHandle = 15,
  MethodType = 16,
  InvokeDynamic = 18,
}

export interface ConstantInfo {
  readInfo(reader: ClassReader): void
}

export function createConstantInfo(
  reader: ClassReader,
  cp: ConstantPool
): ConstantInfo {
  const tag = reader.readUint8()
  const info = createConstantInfoByTag(tag, cp)
  info.readInfo(reader)
  return info
}

function createConstantInfoByTag(tag: UInt8, cp: ConstantPool): ConstantInfo {
  switch (tag) {
    case ConstantInfoTag.Integer:
      return new ConstantIntegerInfo()
    case ConstantInfoTag.Long:
      return new ConstantLongInfo()
    case ConstantInfoTag.Float:
      return new ConstantFloatInfo()
    case ConstantInfoTag.Double:
      return new ConstantDoubleInfo()
    case ConstantInfoTag.Utf8:
      return new ConstantUtf8Info()
    case ConstantInfoTag.String:
      return new ConstantStringInfo(cp)
    case ConstantInfoTag.Class:
      return new ConstantClassInfo(cp)
    case ConstantInfoTag.Fieldref:
      return new ConstantFieldrefInfo(cp)
    case ConstantInfoTag.Methodref:
      return new ConstantMethodrefInfo(cp)
    case ConstantInfoTag.InterfaceMethodref:
      return new ConstantInterfaceMethodrefInfo(cp)
    case ConstantInfoTag.NameAndType:
      return new ConstantNameAndTypeInfo(cp)
    case ConstantInfoTag.MethodType:
      return new ConstantMethodTypeInfo()
    case ConstantInfoTag.MethodHandle:
      return new ConstantMethodHandleInfo()
    case ConstantInfoTag.InvokeDynamic:
      return new ConstantInvokeDynamicInfo()
  }
  throw new Error(`java.lang.ClassFormatError: constant pool tag with ${tag}!`)
}

export class ConstantIntegerInfo implements ConstantInfo {
  val: Int32 = 0

  readInfo(reader: ClassReader): void {
    this.val = reader.readInt32()
  }
}

export class ConstantLongInfo implements ConstantInfo {
  val: Int64 = 0

  readInfo(reader: ClassReader): void {
    this.val = reader.readInt64()
  }
}

export class ConstantFloatInfo implements ConstantInfo {
  val: Float = 0

  readInfo(reader: ClassReader): void {
    this.val = reader.readFloat()
  }
}

export class ConstantDoubleInfo implements ConstantInfo {
  val: Double = 0

  readInfo(reader: ClassReader): void {
    this.val = reader.readDouble()
  }
}

export class ConstantUtf8Info implements ConstantInfo {
  str = ''

  readInfo(reader: ClassReader): void {
    const len = reader.readUInt16()
    const data = new Uint8Array(reader.readBytes(len))
    const decoder = new TextDecoder('utf-8')
    this.str = decoder.decode(data)
  }
}

export class ConstantStringInfo implements ConstantInfo {
  private _stringIndex: UInt16 = 0
  private readonly _cp: ConstantPool

  constructor(cp: ConstantPool) {
    this._cp = cp
  }

  readInfo(reader: ClassReader): void {
    this._stringIndex = reader.readUInt16()
  }

  get string() {
    return this._cp.getUtf8(this._stringIndex)
  }
}

export class ConstantClassInfo implements ConstantInfo {
  private _nameIndex: UInt16 = 0
  private readonly _cp: ConstantPool

  constructor(cp: ConstantPool) {
    this._cp = cp
  }

  readInfo(reader: ClassReader): void {
    this._nameIndex = reader.readUInt16()
  }

  get className() {
    return this._cp.getUtf8(this._nameIndex)
  }
}

export class ConstantNameAndTypeInfo implements ConstantInfo {
  private _nameIndex: UInt16 = 0
  private _descriptorIndex: UInt16 = 0
  private _cp: ConstantPool

  constructor(cp: ConstantPool) {
    this._cp = cp
  }

  readInfo(reader: ClassReader): void {
    this._nameIndex = reader.readUInt16()
    this._descriptorIndex = reader.readUInt16()
  }

  get name() {
    return this._cp.getUtf8(this._nameIndex)
  }

  get descriptor() {
    return this._cp.getUtf8(this._descriptorIndex)
  }
}

export class ConstantMemberrefInfo implements ConstantInfo {
  private _classIndex: UInt16 = 0
  private _nameAndTypeIndex: UInt16 = 0
  private readonly _cp: ConstantPool

  constructor(cp: ConstantPool) {
    this._cp = cp
  }

  readInfo(reader: ClassReader): void {
    this._classIndex = reader.readUInt16()
    this._nameAndTypeIndex = reader.readUInt16()
  }

  get className() {
    return this._cp.getClassName(this._classIndex)
  }

  get nameAndDescriptor() {
    return this._cp.getNameAndType(this._nameAndTypeIndex)
  }
}

export class ConstantFieldrefInfo extends ConstantMemberrefInfo {}

export class ConstantMethodrefInfo extends ConstantMemberrefInfo {}

export class ConstantInterfaceMethodrefInfo extends ConstantMemberrefInfo {}

export class ConstantMethodTypeInfo implements ConstantInfo {
  descriptorIndex: UInt16 = 0

  readInfo(reader: ClassReader): void {
    this.descriptorIndex = reader.readUInt16()
  }
}

export class ConstantMethodHandleInfo implements ConstantInfo {
  referenceKind: UInt8 = 0
  referenceIndex: UInt16 = 0

  readInfo(reader: ClassReader): void {
    this.referenceKind = reader.readUint8()
    this.referenceIndex = reader.readUInt16()
  }
}

export class ConstantInvokeDynamicInfo implements ConstantInfo {
  bootstrapMethodAttrIndex: UInt16 = 0
  nameAndTypeIndex: UInt16 = 0

  readInfo(reader: ClassReader): void {
    this.bootstrapMethodAttrIndex = reader.readUInt16()
    this.nameAndTypeIndex = reader.readUInt16()
  }
}
