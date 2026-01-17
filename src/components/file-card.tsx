import { Skill } from '@/data'
import { buildPreview, copyToClipboard } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Copy, Download } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function FileCard({ skill }: { skill: Skill }) {
  const preview = buildPreview(skill.content)
  return (
    <Card className="group/skill relative">
      <CardHeader className="gap-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base">
              <Link
                to="/$category/$skillId"
                params={{ category: skill.category, slug: skill.slug }}
                className="hover:underline"
              >
                {skill.title}
              </Link>
            </CardTitle>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover/skill:opacity-100">
            <Button
              size="icon-xs"
              variant="ghost"
              aria-label={`Install ${skill.title}`}
              onClick={(e) => {
                e.stopPropagation()
                copyToClipboard(`agentspecs install ${skill.slug}`)
              }}
            >
              <Download />
            </Button>
            <Button
              size="icon-xs"
              variant="ghost"
              aria-label={`Copy ${skill.title}`}
              onClick={(e) => {
                e.stopPropagation()
                copyToClipboard(skill.content)
              }}
            >
              <Copy />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2">
        <Link
          to="/$category/$slug"
          params={{ category: skill.category, slug: skill.slug }}
          className="block flex-1 hover:brightness-95 transition-all"
        >
          <div className="size-full bg-muted p-1 rounded-md cursor-pointer hover:bg-muted/80 transition-colors">
            <p className="text-pretty text-[10px] font-mono text-muted-foreground">
              {preview}
            </p>
          </div>
        </Link>
        <Badge variant="secondary" className="uppercase">
          {skill.category}
        </Badge>
      </CardContent>
    </Card>
  )
}
