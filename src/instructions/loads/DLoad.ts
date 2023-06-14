import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class DLoad extends Index8Instruction {
  execute(frame: Frame): void {
    dload(frame, this.index)
  }
}

export class DLoad0 extends Instruction {
  execute(frame: Frame): void {
    dload(frame, 0)
  }
}

export class DLoad1 extends Instruction {
  execute(frame: Frame): void {
    dload(frame, 1)
  }
}

export class DLoad2 extends Instruction {
  execute(frame: Frame): void {
    dload(frame, 2)
  }
}

export class DLoad3 extends Instruction {
  execute(frame: Frame): void {
    dload(frame, 3)
  }
}

function dload(frame: Frame, index: number) {
  const val = frame.localVars.getDouble(index)
  frame.operandStack.push(val)
}
