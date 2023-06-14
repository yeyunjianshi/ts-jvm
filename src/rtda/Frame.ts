import { LocalVars } from './LocalVars'
import { OperandStack } from './OperandStack'
import { Thread } from './Thread'

export class Frame {
  lower: Nullable<Frame> = null
  readonly localVars: LocalVars
  readonly operandStack: OperandStack
  readonly thread: Thread
  nextPC = 0

  constructor(thread: Thread, maxLocalSzie = 1024, maxStackSize = 1024) {
    this.thread = thread
    this.localVars = new LocalVars(maxLocalSzie)
    this.operandStack = new OperandStack(maxStackSize)
  }
}
