import { parseClass } from './classfile/ClassFile'
import { ClassPath } from './classpath/ClassPath'
import { Frame } from './rtda/Frame'

const jreOption = 'D:/Software/Java/jre-8'

async function execute() {
  const className = 'java.lang.String'.replaceAll('.', '/')

  const classPath = new ClassPath(jreOption)
  const cf = await loadClass(className, classPath)
  console.log(cf)
}

async function loadClass(className: string, classPath: ClassPath) {
  const classData = await classPath.readClass(className)
  if (classData === null) {
    throw new Error(`Class Not Found: ${className}`)
  }
  return parseClass(classData)
}

async function testLocalVarsAndOperandStack() {
  const frame = new Frame(100, 100)
  const vars = frame.localVars

  vars.set(0, 100)
  vars.set(1, -100)
  vars.set(2, 2997924580)
  vars.set(4, -2997924580)
  vars.set(6, 3.1415926)
  vars.set(7, 2.71828182845)
  vars.set(9, null)

  console.log(vars.getInt(0))
  console.log(vars.getInt(1))
  console.log(vars.getLong(2))
  console.log(vars.getLong(4))
  console.log(vars.getFloat(6))
  console.log(vars.getDouble(7))
  console.log(vars.getRef(9))

  const ops = frame.operandStack

  ops.push(100)
  ops.push(-100)
  ops.push(2997924580)
  ops.push(-2997924580)
  ops.push(3.1415926)
  ops.push(2.71828182845)
  ops.push(null)

  console.log(ops.popRef())
  console.log(ops.popDouble())
  console.log(ops.popFloat())
  console.log(ops.popLong())
  console.log(ops.popLong())
  console.log(ops.popInt())
  console.log(ops.popInt())
}

testLocalVarsAndOperandStack()
