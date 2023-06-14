import { lstatSync, existsSync } from 'fs'

export const isFile = (path: string) =>
  existsSync(path) && lstatSync(path).isFile()

export const isDirectory = (path: string) =>
  existsSync(path) && lstatSync(path).isDirectory()

export const isJarOrZipPath = (path: string) =>
  path.endsWith('.jar') ||
  path.endsWith('.JAR') ||
  path.endsWith('.zip') ||
  path.endsWith('.ZIP')

export const lastElement = <T>(arr: T[]) => arr[arr.length - 1]

export const convert = <T>(val: number, clazz: new (length: number) => T) => {
  const arr = new clazz(1) as any
  arr[0] = val
  return arr[0] as number
}
