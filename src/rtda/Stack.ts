import { Frame } from './Frame'

export class Stack {
  maxSize: number
  size = 0
  private _top: Nullable<Frame> = null

  constructor(maxSize: number) {
    this.maxSize = maxSize <= 0 ? Number.MAX_SAFE_INTEGER : maxSize
  }

  push(frame: Frame) {
    if (this.size >= this.maxSize) {
      throw new Error(`java.lang.StackOverflowError`)
    }
    frame.lower = this._top
    this._top = frame
    this.size++
  }

  pop(): Frame {
    if (this._top === null) {
      throw new Error(`jvm stack is empty`)
    }
    const top = this._top
    this._top = this._top.lower
    top.lower = null
    this.size--

    return top
  }

  top(): Frame {
    if (this._top === null) throw new Error(`jvm stack is empty`)

    return this._top
  }
}
