import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class AStore extends Index8Instruction {
  execute(frame: Frame): void {
    store(frame, this.index)
  }
}

export class AStore0 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 0)
  }
}

export class AStore1 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 1)
  }
}

export class AStore2 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 2)
  }
}

export class AStore3 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 3)
  }
}

function store(frame: Frame, index: number) {
  const val = frame.operandStack.popRef()
  frame.localVars.set(index, val)
}
