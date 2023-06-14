import { LocalVars } from './LocalVars'
import { OperandStack } from './OperandStack'

export class Frame {
  lower: Nullable<Frame> = null
  localVars: LocalVars
  operatorStack: OperandStack

  constructor(maxLocalSzie = 1024, maxStackSize = 1024) {
    this.localVars = new LocalVars(maxLocalSzie)
    this.operatorStack = new OperandStack(maxStackSize)
  }
}
