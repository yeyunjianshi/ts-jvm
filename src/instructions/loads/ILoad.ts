import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class ILoad extends Index8Instruction {
  execute(frame: Frame): void {
    iload(frame, this.index)
  }
}

export class ILoad0 extends Instruction {
  execute(frame: Frame): void {
    iload(frame, 0)
  }
}

export class ILoad1 extends Instruction {
  execute(frame: Frame): void {
    iload(frame, 1)
  }
}

export class ILoad2 extends Instruction {
  execute(frame: Frame): void {
    iload(frame, 2)
  }
}

export class ILoad3 extends Instruction {
  execute(frame: Frame): void {
    iload(frame, 3)
  }
}

function iload(frame: Frame, index: number) {
  const val = frame.localVars.getInt(index)
  frame.operandStack.push(val)
}
