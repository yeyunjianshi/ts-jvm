import { resolve } from 'path'
import { Entry, WildcardEntry, createEntry } from './entry'
import { isDirectory } from 'src/utils'

export class Classpath {
  bootClasspath!: Entry
  extClasspath!: Entry
  userClasspath!: Entry

  constructor(jreOption = '', cpOption = '.') {
    this.parseBootAndExtClasspath(jreOption)
    this.parseUserClasspath(cpOption)
  }

  async readClass(className: string) {
    if (!className.endsWith('.class')) className += '.class'

    for (const classpath of [
      this.bootClasspath,
      this.extClasspath,
      this.userClasspath,
    ]) {
      const data = classpath.readClass(className)
      if (data !== null) return data
    }

    return null
  }

  private parseBootAndExtClasspath(jreOption: string) {
    const jreDir = getJreDir(jreOption)

    // jre/lib/*
    const jreLibPath = resolve(jreDir, 'lib', '*')
    this.bootClasspath = new WildcardEntry(jreLibPath)

    // jre/lib/ext/*
    const jreExtPath = resolve(jreDir, 'lib', 'ext', '*')
    this.extClasspath = new WildcardEntry(jreExtPath)
  }

  private parseUserClasspath(cpOption: string) {
    this.userClasspath = createEntry(cpOption)
  }
}

function getJreDir(jreOption = '') {
  if (jreOption !== '' && isDirectory(jreOption)) return jreOption
  if (isDirectory('./jre')) return './jre'

  const javaHomeEnv = process.env.JAVA_HOME
  if (javaHomeEnv && isDirectory(resolve(javaHomeEnv, 'jre')))
    return resolve(javaHomeEnv, 'jre')

  throw new Error(`Can not find jre folder: ${jreOption}`)
}
