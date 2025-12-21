/**
 * Steam Library Scanner
 * Parses Steam's libraryfolders.vdf and appmanifest_*.acf files
 * to discover installed games.
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { homedir } from 'os'
import type { SteamApp, SteamLibrary } from '../shared/types'

// Common Steam installation paths on Windows
const STEAM_PATHS = [
  'C:\\Program Files (x86)\\Steam',
  'C:\\Program Files\\Steam',
  join(homedir(), 'Steam'),
  'D:\\Steam',
  'E:\\Steam',
  'D:\\SteamLibrary',
  'E:\\SteamLibrary'
]

/**
 * Find the Steam installation directory
 */
export function findSteamPath(): string | null {
  for (const path of STEAM_PATHS) {
    if (existsSync(join(path, 'steamapps', 'libraryfolders.vdf'))) {
      return path
    }
  }

  // Check registry as fallback (Windows)
  // For now we'll rely on common paths
  return null
}

/**
 * Parse VDF (Valve Data Format) - a simple key-value format
 * This is a basic parser that handles libraryfolders.vdf and appmanifest files
 */
export function parseVdf(content: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const lines = content.split('\n')
  const stack: Record<string, unknown>[] = [result]
  let currentKey = ''

  for (const line of lines) {
    const trimmed = line.trim()

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('//')) continue

    // Opening brace - start new object
    if (trimmed === '{') {
      const newObj: Record<string, unknown> = {}
      stack[stack.length - 1][currentKey] = newObj
      stack.push(newObj)
      continue
    }

    // Closing brace - pop from stack
    if (trimmed === '}') {
      stack.pop()
      continue
    }

    // Key-value pair: "key" "value"
    const match = trimmed.match(/^"([^"]+)"\s*"([^"]*)"$/)
    if (match) {
      const [, key, value] = match
      stack[stack.length - 1][key] = value
      continue
    }

    // Key only (for nested objects): "key"
    const keyMatch = trimmed.match(/^"([^"]+)"$/)
    if (keyMatch) {
      currentKey = keyMatch[1]
    }
  }

  return result
}

/**
 * Get all Steam library paths from libraryfolders.vdf
 */
export function getSteamLibraryPaths(steamPath: string): string[] {
  const vdfPath = join(steamPath, 'steamapps', 'libraryfolders.vdf')

  if (!existsSync(vdfPath)) {
    return [steamPath] // Fallback to main Steam folder
  }

  try {
    const content = readFileSync(vdfPath, 'utf-8')
    const parsed = parseVdf(content)
    const libraryFolders = parsed['libraryfolders'] as Record<string, unknown> | undefined

    if (!libraryFolders) {
      return [steamPath]
    }

    const paths: string[] = []

    // Iterate through numbered entries (0, 1, 2, etc.)
    for (const key of Object.keys(libraryFolders)) {
      if (/^\d+$/.test(key)) {
        const entry = libraryFolders[key] as Record<string, unknown>
        if (entry && typeof entry.path === 'string') {
          paths.push(entry.path)
        }
      }
    }

    return paths.length > 0 ? paths : [steamPath]
  } catch (error) {
    console.error('Failed to parse libraryfolders.vdf:', error)
    return [steamPath]
  }
}

/**
 * Parse an appmanifest file to extract game info
 */
export function parseAppManifest(manifestPath: string): SteamApp | null {
  try {
    const content = readFileSync(manifestPath, 'utf-8')
    const parsed = parseVdf(content)
    const appState = parsed['AppState'] as Record<string, unknown> | undefined

    if (!appState) return null

    const appId = appState['appid'] as string
    const name = appState['name'] as string
    const installDir = appState['installdir'] as string

    if (!appId || !name || !installDir) return null

    const libraryPath = dirname(dirname(manifestPath)) // Go up from steamapps to library root
    const fullPath = join(libraryPath, 'steamapps', 'common', installDir)

    return {
      appId,
      name,
      installDir,
      fullPath
    }
  } catch (error) {
    console.error(`Failed to parse manifest ${manifestPath}:`, error)
    return null
  }
}

/**
 * Scan a Steam library for installed games
 */
export function scanSteamLibrary(libraryPath: string): SteamApp[] {
  const steamappsPath = join(libraryPath, 'steamapps')

  if (!existsSync(steamappsPath)) {
    return []
  }

  const apps: SteamApp[] = []

  try {
    const files = readdirSync(steamappsPath)

    for (const file of files) {
      if (file.startsWith('appmanifest_') && file.endsWith('.acf')) {
        const manifestPath = join(steamappsPath, file)
        const app = parseAppManifest(manifestPath)

        if (app && existsSync(app.fullPath)) {
          apps.push(app)
        }
      }
    }
  } catch (error) {
    console.error(`Failed to scan library ${libraryPath}:`, error)
  }

  return apps
}

/**
 * Scan all Steam libraries for installed games
 */
export function scanAllSteamLibraries(): SteamLibrary[] {
  const steamPath = findSteamPath()

  if (!steamPath) {
    console.warn('Steam installation not found')
    return []
  }

  const libraryPaths = getSteamLibraryPaths(steamPath)
  const libraries: SteamLibrary[] = []

  for (const path of libraryPaths) {
    const apps = scanSteamLibrary(path)
    libraries.push({ path, apps })
  }

  return libraries
}

/**
 * Get all Steam games as a flat list
 */
export function getAllSteamGames(): SteamApp[] {
  const libraries = scanAllSteamLibraries()
  return libraries.flatMap(lib => lib.apps)
}
