import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skill } from '@/data/skill'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

export function SkillDetails({ skill }: { skill: Skill }) {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight inline-flex items-center gap-2 mb-2">
          {skill.title}
        </h1>
        <Link to={skill.author.url} target="_blank">
          <div className="flex items-center gap-1 h-fit">
            <Avatar size="sm">
              <AvatarImage src={skill.author.avatar} />
              <AvatarFallback>{skill.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-foreground font-medium">
              {skill.author.name}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link to={skill.githubUrl} target="_blank">
          <span className="text-xs text-foreground px-2 py-0.5 w-fit rounded-full bg-muted flex items-center gap-1 group/chip">
            GitHub
            <ArrowUpRight className="size-3 group-hover/chip:rotate-45 transition-all" />
          </span>
        </Link>

        <Link to={skill.rawMarkdownUrl} target="_blank">
          <span className="text-xs text-foreground px-2 py-0.5 w-fit rounded-full bg-muted flex items-center gap-1 group/chip">
            Markdown
            <ArrowUpRight className="size-3 group-hover/chip:rotate-45 transition-all" />
          </span>
        </Link>
      </div>
    </div>
  )
}
