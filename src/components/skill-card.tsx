import { Skill } from '@/data'
import { buildPreview } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { SkillAuthorBadge } from './skill-author-badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function SkillCard({ skill }: { skill: Skill }) {
  const preview = buildPreview(skill.content)
  return (
    <Card className="group/skill relative" size="sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base">
            <Link
              to="/$category/$slug"
              params={{ category: skill.category, slug: skill.slug }}
              className="hover:underline"
            >
              {skill.title}
            </Link>
          </CardTitle>
          <SkillAuthorBadge author={skill.author} />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <Link
          to="/$category/$slug"
          params={{ category: skill.category, slug: skill.slug }}
          className="block flex-1 hover:brightness-95 transition-all"
        >
          <div className="prose prose-sm size-full bg-muted p-2 rounded-md cursor-pointer hover:bg-muted/80 transition-colors">
            <code className="whitespace-pre-wrap text-pretty block text-[10px] font-mono text-muted-foreground">
              {preview}
            </code>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
