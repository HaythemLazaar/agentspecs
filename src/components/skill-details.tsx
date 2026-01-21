import { Skill } from '@/data/skill'
import { SkillAuthorBadge } from './skill-author-badge'
import { LinkChip } from './ui/link-chip'

export function SkillDetails({ skill }: { skill: Skill }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight inline-flex items-center gap-2 mb-2 capitalize">
          {skill.name.replace(/-/g, ' ')}
        </h1>
        <SkillAuthorBadge author={skill.author} variant="_blank" />
      </div>

      <div className="flex items-center gap-2">
        <LinkChip
          link={skill.githubUrl ?? skill.author.url ?? ''}
          label={skill.githubUrl ? 'GitHub' : 'Website'}
          iconSrc={
            skill.githubUrl ? 'https://github.com/favicon.ico' : undefined
          }
        />
        <LinkChip link={skill.rawMarkdownUrl} label="Markdown" />
      </div>
    </div>
  )
}
