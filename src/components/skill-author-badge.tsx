import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function SkillAuthorBadge({
  author,
  className,
  variant = 'default',
}: {
  author: { name: string; url?: string; avatar?: string }
  className?: string
  variant?: 'default' | '_blank'
}) {
  if (variant === '_blank') {
    return (
      <Link to={author.url} target="_blank" className={cn("flex items-center gap-1 h-fit group/author-badge", className)}>
        <Avatar size="sm">
          <AvatarImage src={author.avatar} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-foreground font-medium whitespace-nowrap group-hover/author-badge:brightness-140 transition-all">
          {author.name}
        </span>
        <ArrowUpRight className="size-0 -ml-1 group-hover/author-badge:ml-0 group-hover/author-badge:size-3 opacity-0 group-hover/author-badge:opacity-100 transition-all" />
      </Link>
    )
  }
  return (
    <Link
      to="/$author/skills"
      params={{ author: author.name }}
      className={cn(
        'flex items-center gap-1 px-1 py-0.5 w-fit rounded-md border bg-neutral-100 dark:bg-neutral-800 group/author-badge hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all',
        className,
      )}
    >
      <Avatar size="xs">
        <AvatarImage src={author.avatar} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="text-xs font-medium">{author.name}</span>
      <ArrowUpRight className="size-0 -ml-1 group-hover/author-badge:ml-0 group-hover/author-badge:size-3 opacity-0 group-hover/author-badge:opacity-100 group-hover/author-badge:rotate-45 transition-all" />
    </Link>
  )
}
