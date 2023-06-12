import { ClassPath } from './classpath'

const jreOption = 'D:/Software/Java/jre-8'

async function execute() {
  const pathname = 'java.lang.Object'.replaceAll('.', '/')

  const cp = new ClassPath(jreOption)
  const data = await cp.readClass(pathname)
  console.log(data)
}

execute()
