import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Avatar, AvatarImage } from './avatar'

export function LinkChip({
  link,
  label,
  className,
  iconSrc,
}: {
  link: string
  label: string
  className?: string
  iconSrc?: string
}) {
  return (
    <Link
      to={link}
      target="_blank"
      className={cn(
        'text-[11px] font-mono tracking-tighter text-foreground px-2 py-0.5 w-fit rounded-full bg-muted flex items-center gap-1 group/chip',
        className,
      )}
    >
      {iconSrc && (
        <Avatar size="xs" className="size-3!">
          <AvatarImage src={iconSrc} />
        </Avatar>
      )}
      <span className='-mb-0.5'>
        {label}
      </span>
      <ArrowUpRight className="size-3 group-hover/chip:rotate-45 transition-all" />
    </Link>
  )
}
