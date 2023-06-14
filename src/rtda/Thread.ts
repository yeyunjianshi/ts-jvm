import { Stack } from './Stack'
import { Frame } from './Frame'

export class Thread {
  pc = 0
  private readonly _stack: Stack

  constructor() {
    this._stack = new Stack(1024)
  }

  pushFrame(frame: Frame) {
    this._stack.push(frame)
  }

  popFrame() {
    return this._stack.pop()
  }

  currentFrame() {
    return this._stack.top()
  }
}
