import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class DStore extends Index8Instruction {
  execute(frame: Frame): void {
    store(frame, this.index)
  }
}

export class DStore0 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 0)
  }
}

export class DStore1 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 1)
  }
}

export class DStore2 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 2)
  }
}

export class DStore3 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 3)
  }
}

function store(frame: Frame, index: number) {
  const val = frame.operandStack.popDouble()
  frame.localVars.set(index, val)
}
