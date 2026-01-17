import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function SkillAuthorBadge({
  author,
}: {
  author: { name: string; url?: string; avatar?: string }
}) {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5 w-fit rounded-md border bg-neutral-100 dark:bg-neutral-800">
      <Avatar size="xs">
        <AvatarImage src={author.avatar} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="text-xs font-medium">{author.name}</span>
    </div>
  )
}
