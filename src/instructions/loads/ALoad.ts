import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class ALoad extends Index8Instruction {
  execute(frame: Frame): void {
    aload(frame, this.index)
  }
}

export class ALoad0 extends Instruction {
  execute(frame: Frame): void {
    aload(frame, 0)
  }
}

export class ALoad1 extends Instruction {
  execute(frame: Frame): void {
    aload(frame, 1)
  }
}

export class ALoad2 extends Instruction {
  execute(frame: Frame): void {
    aload(frame, 2)
  }
}

export class ALoad3 extends Instruction {
  execute(frame: Frame): void {
    aload(frame, 3)
  }
}

function aload(frame: Frame, index: number) {
  const ref = frame.localVars.getRef(index)
  frame.operandStack.push(ref)
}
