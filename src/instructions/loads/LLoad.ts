import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class LLoad extends Index8Instruction {
  execute(frame: Frame): void {
    lload(frame, this.index)
  }
}

export class LLoad0 extends Instruction {
  execute(frame: Frame): void {
    lload(frame, 0)
  }
}

export class LLoad1 extends Instruction {
  execute(frame: Frame): void {
    lload(frame, 1)
  }
}

export class LLoad2 extends Instruction {
  execute(frame: Frame): void {
    lload(frame, 2)
  }
}

export class LLoad3 extends Instruction {
  execute(frame: Frame): void {
    lload(frame, 3)
  }
}

function lload(frame: Frame, index: number) {
  const val = frame.localVars.getLong(index)
  frame.operandStack.push(val)
}
