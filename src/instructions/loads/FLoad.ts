import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class FLoad extends Index8Instruction {
  execute(frame: Frame): void {
    fload(frame, this.index)
  }
}

export class FLoad0 extends Instruction {
  execute(frame: Frame): void {
    fload(frame, 0)
  }
}

export class FLoad1 extends Instruction {
  execute(frame: Frame): void {
    fload(frame, 1)
  }
}

export class FLoad2 extends Instruction {
  execute(frame: Frame): void {
    fload(frame, 2)
  }
}

export class FLoad3 extends Instruction {
  execute(frame: Frame): void {
    fload(frame, 3)
  }
}

function fload(frame: Frame, index: number) {
  const ref = frame.localVars.getFloat(index)
  frame.operandStack.push(ref)
}
