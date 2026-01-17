import { Skill } from '@/data'
import { buildPreview, cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { SkillAuthorBadge } from './skill-author-badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function SkillCard({
  skill,
  className,
}: {
  skill: Skill
  className?: string
}) {
  const preview = buildPreview(skill.content)
  return (
    <Card
      className={cn('group/skill relative rounded-none', className)}
      size="sm"
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base tracking-tight">
            <Link
              to="/$category/$slug"
              params={{ category: skill.category, slug: skill.slug }}
              className="hover:underline capitalize"
            >
              {skill.name.replace(/-/g, ' ')}
            </Link>
          </CardTitle>
          <SkillAuthorBadge author={skill.author} />
        </div>
      </CardHeader>
      <CardContent className="flex-1 max-h-52.5 overflow-hidden">
        <Link
          to="/$category/$slug"
          params={{ category: skill.category, slug: skill.slug }}
          className="mask-b-from-80% backdrop-blur-2xl block hover:brightness-95 transition-all prose prose-sm size-full bg-muted/70 p-3 rounded cursor-pointer hover:bg-muted/20"
        >
          <code className="whitespace-pre-wrap text-pretty block text-[10px] font-mono text-muted-foreground">
            {preview}
          </code>
        </Link>
      </CardContent>
    </Card>
  )
}
