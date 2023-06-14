import { Frame } from 'src/rtda/Frame'
import { Index8Instruction, Instruction } from '../base/Instruction'

export class IStore extends Index8Instruction {
  execute(frame: Frame): void {
    store(frame, this.index)
  }
}

export class IStore0 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 0)
  }
}

export class IStore1 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 1)
  }
}

export class IStore2 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 2)
  }
}

export class IStore3 extends Instruction {
  execute(frame: Frame): void {
    store(frame, 3)
  }
}

function store(frame: Frame, index: number) {
  const val = frame.operandStack.popInt()
  frame.localVars.set(index, val)
}
