import { Frame } from 'src/rtda/Frame'
import { Instruction } from '../base/Instruction'

// push null
export class AConstNull extends Instruction {}

//Push double constant
export class DConst0 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0.0)
  }
}

export class DConst1 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1.0)
  }
}

//Push float constant
export class FConst0 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0.0)
  }
}

export class FConst1 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1.0)
  }
}

export class FConst2 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(2.0)
  }
}

// Push int constant
export class IConstM1 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(-1)
  }
}

export class IConst0 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0)
  }
}

export class IConst1 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1)
  }
}

export class IConst2 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(2)
  }
}

export class IConst3 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(3)
  }
}

export class IConst4 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(4)
  }
}

export class IConst5 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(5)
  }
}

// Push long constant
export class LConst0 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0)
  }
}

export class LConst1 extends Instruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1)
  }
}
