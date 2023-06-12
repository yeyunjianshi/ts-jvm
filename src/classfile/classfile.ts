import { AttributeInfo, createAttributeInfos } from './AttributeInfo'
import { ClassReader } from './ClassReader'
import { ConstantPool } from './ConstantPool'
import { MemberInfo, createMemberInfos } from './MemberInfo'

export class ClassFile {
  magic!: UInt32
  minorVersion!: UInt16
  majorVersion!: UInt16
  constatntPool: ConstantPool
  accessFlags!: UInt16
  thisClass!: UInt16
  superClass!: UInt16
  interfaces!: UInt16[]
  fields: MemberInfo[]
  methods: MemberInfo[]
  attributes: AttributeInfo[]

  constructor(private reader: ClassReader) {
    this.readAndCheckMagic()
    this.readAndCheckVersionNumber()
    this.constatntPool = new ConstantPool(reader)
    this.accessFlags = this.reader.readUInt16()
    this.thisClass = this.reader.readUInt16()
    this.superClass = this.reader.readUInt16()
    this.interfaces = this.reader.readUInt16s()
    this.fields = createMemberInfos(reader, this.constatntPool)
    this.methods = createMemberInfos(reader, this.constatntPool)
    this.attributes = createAttributeInfos(reader, this.constatntPool)
  }

  readAndCheckMagic() {
    this.magic = this.reader.readUInt32()
    if (this.magic !== 0xcafebabe) {
      throw new Error(`java.lang.ClassFormError: magic!`)
    }
  }

  readAndCheckVersionNumber() {
    this.minorVersion = this.reader.readUInt16()
    this.majorVersion = this.reader.readUInt16()

    switch (this.majorVersion) {
      case 45:
        return
      case 46:
      case 47:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
        if (this.minorVersion === 0) return
    }
    throw new Error(
      `java.lang.UnsupportedClassVersion: ${this.majorVersion}.${this.minorVersion}`
    )
  }

  get className(): string {
    return this.constatntPool.getClassName(this.thisClass)
  }

  get superClassName(): string {
    return this.constatntPool.getClassName(this.superClass)
  }

  get interfacesNames(): string[] {
    return this.interfaces.map((index) =>
      this.constatntPool.getClassName(index)
    )
  }
}

export function parseClass(classData: Buffer) {
  return new ClassFile(new ClassReader(classData))
}
