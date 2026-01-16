import { Skill } from '@/data/skills'
import { buildPreview, copyToClipboard } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Copy, Download } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function FileCard({ skill }: { skill: Skill }) {
  const preview = buildPreview(skill.content)
  return (
    <Card className="group/skill relative">
      <CardHeader className="gap-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base">
              <Link
                to="/skills/$skillId"
                params={{ skillId: skill.id }}
                className="hover:underline"
              >
                {skill.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              <span className="tabular-nums">{skill.when}</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="uppercase">
              {skill.category}
            </Badge>
            <div className="flex items-center gap-1 opacity-0 group-hover/skill:opacity-100">
              <Button
                size="icon-xs"
                variant="ghost"
                aria-label={`Install ${skill.title}`}
                onClick={(e) => {
                  e.stopPropagation()
                  copyToClipboard(`agentspecs install ${skill.id}`)
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
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <Link
          to="/$category/$skillId"
          params={{ category: skill.category, skillId: skill.id }}
          className="block size-full"
        >
          <div className="size-full bg-neutral-50 p-1 cursor-pointer hover:bg-neutral-100 transition-colors">
            <p className="text-pretty text-[10px] font-mono text-muted-foreground">
              {preview}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
