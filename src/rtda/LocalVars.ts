import { JObject } from './JObject'

export class Slot {
  readonly val: unknown

  constructor(val: unknown) {
    this.val = val
  }
}

export class LocalVars {
  maxSize = 0
  private _slots: Map<number, Slot> = new Map<number, Slot>()

  constructor(maxSize = 0) {
    this.maxSize = maxSize <= 0 ? Number.MAX_SAFE_INTEGER : maxSize
  }

  set(index: number, val: unknown) {
    this.checkSize(index)
    this._slots.set(index, new Slot(val))
  }

  // setInt(index: number, val: Int32) {
  //   this._slots.set(index, new Slot(val))
  // }

  getInt(index: number) {
    const val = this._slots.get(index)
    return val ? (val.val as Int32) : null
  }

  getFloat(index: number) {
    const val = this._slots.get(index)
    return val ? (val.val as Float) : null
  }

  // setLong(index: number, val: Int64) {
  //   return this._slots.set(index, new Slot(val))
  // }

  getLong(index: number) {
    const val = this._slots.get(index)
    return val ? (val.val as Int64) : null
  }

  // setDouble(index: number, val: Double) {
  //   return this._slots.set(index, new Slot(val))
  // }

  getDouble(index: number) {
    const val = this._slots.get(index)
    return val ? (val.val as Double) : null
  }

  // setRef(index: number, val: JObject) {
  //   return this._slots.set(index, new Slot(val))
  // }

  getRef(index: number) {
    const val = this._slots.get(index)
    return val ? (val.val as JObject) : null
  }

  checkSize(index: number) {
    if (index < 0 || index > this.maxSize) {
      throw new Error(`java.lang.IndexOutOfBounds: ${index}`)
    }
  }
}
