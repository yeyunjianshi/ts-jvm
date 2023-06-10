import { Classpath } from './classpath'

const jreOption = 'D:/Software/Java/jre-8'

async function execute() {
  const pathname = 'java.lang.Object'.replaceAll('.', '/')

  const cp = new Classpath(jreOption)
  const data = await cp.readClass(pathname)
  console.log(data)
}

execute()
