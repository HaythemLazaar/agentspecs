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

const PREVIEW_LENGTH = 300

export function buildPreview(content: string) {
  if (content.length <= PREVIEW_LENGTH) return content
  return `${content.slice(0, PREVIEW_LENGTH)}...`
}
