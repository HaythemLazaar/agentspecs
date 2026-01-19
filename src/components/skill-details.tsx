import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skill } from '@/data/skill'
import { Link } from '@tanstack/react-router'
import { LinkChip } from './ui/link-chip'

export function SkillDetails({ skill }: { skill: Skill }) {
  const link = skill.githubUrl
    ? `https://github.com/${skill.githubUrl}`
    : skill.author.url
      ? skill.author.url
      : undefined
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight inline-flex items-center gap-2 mb-2 capitalize">
          {skill.name.replace(/-/g, ' ')}
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
        {link && (
          <LinkChip
            link={link}
            label={skill.githubUrl ? 'GitHub' : 'Website'}
            iconSrc={
              skill.githubUrl ? 'https://github.com/favicon.ico' : undefined
            }
          />
        )}
        <LinkChip link={skill.rawMarkdownUrl} label="Markdown" />
      </div>
    </div>
  )
}
