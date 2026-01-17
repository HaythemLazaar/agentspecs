import { cn } from '@/lib/utils'
import { IconCopy, IconCopyCheckFilled } from '@tabler/icons-react'
import { useTransition } from 'react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function CopyButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [pending, startTransition] = useTransition()
  const copyToClipboard = async () => {
    startTransition(async () => {
      navigator.clipboard.writeText(text)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('size-6 p-0', className)}
            onClick={copyToClipboard}
          >
            {pending ? (
              <IconCopyCheckFilled className="size-4" />
            ) : (
              <IconCopy className="size-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{pending ? 'Copied!' : 'Copy to clipboard'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
