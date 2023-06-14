import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class FStore extends Index8Instruction {
  execute(frame: Frame): void {
    store(frame, this.index)
  }
}

export class FStore0 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 0)
  }
}

export class FStore1 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 1)
  }
}

export class FStore2 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 2)
  }
}

export class FStore3 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 3)
  }
}

function store(frame: Frame, index: number) {
  const val = frame.operandStack.popFloat()
  frame.localVars.set(index, val)
}
