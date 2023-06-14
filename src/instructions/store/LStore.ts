import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class LStore extends Index8Instruction {
  execute(frame: Frame): void {
    store(frame, this.index)
  }
}

export class LStore0 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 0)
  }
}

export class LStore1 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 1)
  }
}

export class LStore2 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 2)
  }
}

export class LStore3 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 3)
  }
}

function store(frame: Frame, index: number) {
  const val = frame.operandStack.popLong()
  frame.localVars.set(index, val)
}
