import { isAbsolute, resolve } from 'path'
import { promises, readdirSync } from 'fs'
import AdmZip from 'adm-zip'
import { isDirectory, isFile, isJarOrZipPath } from 'src/utils'

export interface Entry {
  readClass(className: string): Promise<Buffer | null>
}

const pathListSeparator = ';'

const getAbsolutePath = (path: string) =>
  isAbsolute(path) ? path : resolve(process.cwd(), path)

const readFileByAbsoutePath = async (path: string) => {
  if (isFile(path)) {
    const data = await promises.readFile(path, 'binary')
    return Buffer.from(data)
  }
  return null
}

export function createEntry(path: string): Entry {
  if (path.indexOf(pathListSeparator) !== -1) {
    return new CompositeEntry(path)
  }
  if (path.endsWith('*')) {
    return new WildcardEntry(path)
  }
  if (isJarOrZipPath(path)) return new ZipEntry(path)
  return new DirEntry(path)
}

export class DirEntry implements Entry {
  private readonly _absPath: string

  constructor(path: string) {
    this._absPath = getAbsolutePath(path)
  }

  async readClass(className: string): Promise<Buffer | null> {
    const filePath = resolve(this._absPath, className)
    return readFileByAbsoutePath(filePath)
  }

  toString(): string {
    return this._absPath
  }
}

export class ZipEntry implements Entry {
  private readonly _zip: AdmZip

  constructor(path: string) {
    this._zip = new AdmZip(getAbsolutePath(path))
  }

  async readClass(className: string): Promise<Buffer | null> {
    const zipEntries = this._zip.getEntries()
    for (const entry of zipEntries) {
      if (entry.entryName === className) {
        return entry.getData()
      }
    }
    return null
  }
}

export class CompositeEntry implements Entry {
  protected entries: Entry[] = []

  constructor(path: string) {
    const paths = path.split(pathListSeparator)
    for (const path of paths) {
      this.entries.push(createEntry(path))
    }
  }

  async readClass(className: string): Promise<Buffer | null> {
    for (const entry of this.entries) {
      const data = await entry.readClass(className)
      if (data !== null) return data
    }
    return null
  }
}

export class WildcardEntry implements Entry {
  private readonly entries: Entry[] = []

  constructor(path: string) {
    const absPath = getAbsolutePath(path.slice(0, path.length - 1))
    if (!isDirectory(absPath)) return

    const dir = readdirSync(absPath)
    for (const fileName of dir) {
      const filePath = resolve(absPath, fileName)
      if (isJarOrZipPath(filePath)) {
        this.entries.push(createEntry(filePath))
      }
    }
  }

  async readClass(className: string): Promise<Buffer | null> {
    for (const entry of this.entries) {
      const data = await entry.readClass(className)
      if (data !== null) return data
    }
    return null
  }
}
