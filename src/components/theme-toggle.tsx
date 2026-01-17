import { IconBrightness } from '@tabler/icons-react'
import * as React from 'react'
import { useTheme } from './theme-provider'
import { Button } from './ui/button'

export function ThemeToggle() {
  const { themeMode, toggleMode } = useTheme()

  const handleToggleMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggleMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="ghost"
      size="xs"
      className="size-8 p-1"
      onClick={handleToggleMode}
    >
      <IconBrightness className="size-4" />
    </Button>
  )
}
