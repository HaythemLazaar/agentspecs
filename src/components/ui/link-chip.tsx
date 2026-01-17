import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

export function LinkChip({
  link,
  label,
  className,
}: {
  link: string
  label: string
  className?: string
}) {
  return (
    <Link
      to={link}
      target="_blank"
      className={cn(
        'text-xs text-foreground px-2 py-0.5 w-fit rounded-full bg-muted flex items-center gap-1 group/chip',
        className,
      )}
    >
      {label}
      <ArrowUpRight className="size-3 group-hover/chip:rotate-45 transition-all" />
    </Link>
  )
}
