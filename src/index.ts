import { parseClass } from './classfile/ClassFile'
import { ClassPath } from './classpath/ClassPath'

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

execute()
