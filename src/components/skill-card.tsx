import { Skill } from '@/data'
import { buildPreview, cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { SkillAuthorBadge } from './skill-author-badge'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'

export function SkillCard({
  skill,
  className,
  ...props
}: {
  skill: Skill
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const preview = buildPreview(skill.content)
  return (
    <Card className={cn('relative rounded-none hover:bg-muted/70 transition-all', className)} size="sm" {...props}>
      <CardContent className="flex-1 min-h-32 max-h-32 overflow-hidden bg-transparent">
        <Link
          to="/$category/$slug"
          params={{ category: skill.category, slug: skill.slug }}
          className="group/skill mask-b-from-80% block transition-all prose prose-sm size-full rounded-t-lg cursor-pointer"
        >
          <CardTitle className="text-base tracking-tight capitalize -mt-0.5">
            {skill.name.replace(/-/g, ' ')}
          </CardTitle>
          <code className="opacity-70 group-hover/skill:opacity-100 transition-all whitespace-pre-wrap text-pretty block text-[10px] font-mono text-muted-foreground">
            {preview}
          </code>
        </Link>
      </CardContent>
      <CardFooter className="-mt-2">
        <SkillAuthorBadge author={skill.author} className="-mb-0.5" />
      </CardFooter>
    </Card>
  )
}
