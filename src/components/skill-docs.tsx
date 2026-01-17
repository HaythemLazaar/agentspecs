import { Skill } from '@/data/skill'
import { SkillInstall } from './skill-install'

export function SkillDocs({ skill }: { skill: Skill }) {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Installation</h2>
        <SkillInstall skill={skill} />
      </div>
    </>
  )
}
