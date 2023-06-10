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
