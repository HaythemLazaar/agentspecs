import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function copyToClipboard(value: string) {
  if (!navigator?.clipboard?.writeText) return
  void navigator.clipboard.writeText(value)
}

export function buildPreview(content: string) {
  if (!content) return 'No preview available.'
  const cleaned = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[`#>*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (cleaned.length <= 180) {
    return cleaned
  }

  return `${cleaned.slice(0, 180).trim()}…`
}
