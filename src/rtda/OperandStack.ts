import { Slot } from './LocalVars'
import { JObject } from './JObject'

export class OperandStack {
  maxSize: number
  slots: Slot[] = []

  constructor(maxSize: number) {
    this.maxSize = maxSize <= 0 ? Number.MAX_SAFE_INTEGER : maxSize
  }

  push(val: Int32 | Int64 | Float | Double | JObject | Slot | null) {
    if (this.slots.length > this.maxSize) {
      throw new Error(`java.lang.IndexOutOfBounds: push operand stack`)
    }
    this.slots.push(new Slot(val))
  }

  pop() {
    if (this.slots.length === 0) {
      throw new Error(`java.lang.IndexOutOfBounds: pop operand stack`)
    }
    return this.slots.pop()?.val
  }

  popInt() {
    return this.pop() as Int32
  }

  popLong() {
    return this.pop() as Int64
  }

  popFloat() {
    return this.pop() as Float
  }

  popDouble() {
    return this.pop() as Double
  }

  popRef() {
    return this.pop() as Nullable<JObject>
  }

  popSlot() {
    return this.pop() as Slot
  }
}
