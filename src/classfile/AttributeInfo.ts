import { ClassReader } from './ClassReader'
import { ConstantPool } from './ConstantPool'

export interface AttributeInfo {
  readInfo(reader: ClassReader): void
}

export function createAttributeInfos(
  reader: ClassReader,
  cp: ConstantPool
): AttributeInfo[] {
  const attribteCount = reader.readUInt16()
  return Array.from({ length: attribteCount }, () => {
    const attrNameIndex = reader.readUInt16()
    const attrName = cp.getUtf8(attrNameIndex)
    const attrLen = reader.readUInt32()
    const attrInfo = createAttributeInfoByAttrName(attrName, attrLen, cp)
    attrInfo.readInfo(reader)
    return attrInfo
  })
}

export function createAttributeInfoByAttrName(
  attrName: string,
  attrLen: UInt32,
  cp: ConstantPool
): AttributeInfo {
  switch (attrName) {
    case 'Code':
      return new CodeAttribte(cp)
    case 'ConstantValue':
      return new ConstantValueAttribute()
    case 'Deprecated':
      return new DeprecatedAttribute()
    case 'Exceptions':
      return new ExceptionsAttribute()
    case 'LineNumberTable':
      return new LineNumberTableAttribute()
    case 'LocalVariableTable':
      return new LocalVariableTypeTableAttribute()
    case 'SourceFile':
      return new SourceFileAttribute(cp)
    case 'Synthetic':
      return new SyntheticAttribute()
  }
  return new UnparsedAttribute(attrName, attrLen)
}

export class UnparsedAttribute implements AttributeInfo {
  name: string
  length: UInt32
  info: UInt8[] = []

  constructor(name: string, length: UInt32) {
    this.name = name
    this.length = length
  }

  readInfo(reader: ClassReader): void {
    this.info = reader.readBytes(this.length)
  }
}

export class MarkAttribute implements AttributeInfo {
  readInfo(): void {
    // empty
  }
}

export class DeprecatedAttribute extends MarkAttribute {}

export class SyntheticAttribute extends MarkAttribute {}

export class SourceFileAttribute implements AttributeInfo {
  private readonly _cp: ConstantPool
  private _sourceFileIndex: UInt16 = 0

  constructor(cp: ConstantPool) {
    this._cp = cp
  }

  readInfo(reader: ClassReader): void {
    this._sourceFileIndex = reader.readUInt16()
  }

  sourceFile() {
    return this._cp.getUtf8(this._sourceFileIndex)
  }
}

export class ConstantValueAttribute implements AttributeInfo {
  constantValueIndex: UInt16 = 0

  readInfo(reader: ClassReader): void {
    this.constantValueIndex = reader.readUInt16()
  }
}

export class CodeAttribte implements AttributeInfo {
  cp: ConstantPool
  maxStack: UInt16 = 0
  maxLocals: UInt16 = 0
  code: UInt8[] = []
  exceptionTable: ExceptionTableEntry[] = []
  attributes: AttributeInfo[] = []

  constructor(cp: ConstantPool) {
    this.cp = cp
  }

  readInfo(reader: ClassReader): void {
    this.maxStack = reader.readUInt16()
    this.maxLocals = reader.readUInt16()
    const codeLength = reader.readUInt32()
    this.code = reader.readBytes(codeLength)
    this.exceptionTable = createExceptionTable(reader)
    this.attributes = createAttributeInfos(reader, this.cp)
  }
}

export class ExceptionTableEntry {
  constructor(
    public startPC: UInt16,
    public endPC: UInt16,
    public handlerPC: UInt16,
    public catchType: UInt16
  ) {}
}

function createExceptionTable(reader: ClassReader) {
  const exceptionTableLength = reader.readUInt16()
  return Array.from({ length: exceptionTableLength }, () => {
    const startPC = reader.readUInt16()
    const endPC = reader.readUInt16()
    const handlerPC = reader.readUInt16()
    const catchType = reader.readUInt16()
    return new ExceptionTableEntry(startPC, endPC, handlerPC, catchType)
  })
}

export class ExceptionsAttribute implements AttributeInfo {
  exceptionIndexTable: UInt16[] = []

  readInfo(reader: ClassReader): void {
    this.exceptionIndexTable = reader.readUInt16s()
  }
}

export class LineNumberTableAttribute implements AttributeInfo {
  lineNumberTable: LineNumberTableEntry[] = []

  readInfo(reader: ClassReader): void {
    const lineNumberTableLength = reader.readUInt16()
    this.lineNumberTable = Array.from({ length: lineNumberTableLength }, () => {
      const startPC = reader.readUInt16()
      const lineNumber = reader.readUInt16()
      return new LineNumberTableEntry(startPC, lineNumber)
    })
  }
}

export class LineNumberTableEntry {
  constructor(public startPC: UInt16, public lineNumber: UInt16) {}
}

export class LocalVariableTypeTableAttribute implements AttributeInfo {
  startPC: UInt16 = 0
  length: UInt16 = 0
  nameIndex: UInt16 = 0
  descriptorIndex: UInt16 = 0
  index: UInt16 = 0
  values: LocalVariableTypeTableEntry[] = []

  readInfo(reader: ClassReader): void {
    const localVariableTableLength = reader.readUInt16()
    this.values = Array.from({ length: localVariableTableLength }, () => {
      const startPC = reader.readUInt16()
      const length = reader.readUInt16()
      const nameIndex = reader.readUInt16()
      const signatureIndex = reader.readUInt16()
      const index = reader.readUInt16()
      return new LocalVariableTypeTableEntry(
        startPC,
        length,
        nameIndex,
        signatureIndex,
        index
      )
    })
  }
}

export class LocalVariableTypeTableEntry {
  constructor(
    public startPC: UInt16,
    public length: UInt16,
    public nameIndex: UInt16,
    public signatureIndex: UInt16,
    public index: UInt16
  ) {}
}
