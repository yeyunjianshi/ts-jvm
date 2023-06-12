import { AttributeInfo, createAttributeInfos } from './AttributeInfo'
import { ClassReader } from './ClassReader'
import { ConstantPool } from './ConstantPool'

export class MemberInfo {
  cp: ConstantPool
  accessFlags: UInt16
  nameIndex: UInt16
  descriptorIndex: UInt16
  attributes: AttributeInfo[]

  constructor(reader: ClassReader, cp: ConstantPool) {
    this.cp = cp
    this.accessFlags = reader.readUInt16()
    this.nameIndex = reader.readUInt16()
    this.descriptorIndex = reader.readUInt16()
    this.attributes = createAttributeInfos(reader, cp)
  }

  name() {
    return this.cp.getUtf8(this.nameIndex)
  }

  descriptor() {
    return this.cp.getUtf8(this.descriptorIndex)
  }
}

export function createMemberInfos(reader: ClassReader, cp: ConstantPool) {
  const memberCount = reader.readUInt16()
  return Array.from({ length: memberCount }, () => new MemberInfo(reader, cp))
}
