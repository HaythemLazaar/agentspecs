import { Search } from 'lucide-react'
import { useState } from 'react'

import { SkillCard } from '@/components/skill-card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import type { Skill } from '@/data'
import { cn } from '@/lib/utils'

export function SkillGrid({
  skills,
  className,
  hideSearch = false,
}: {
  skills: Skill[]
  className?: string
  hideSearch?: boolean
}) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredSkills = normalizedQuery
    ? skills.filter((skill: Skill) =>
      [skill.name, skill.content, skill.category].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    )
    : skills
  return (
    <>
      {!hideSearch && (
        <div className="w-full">
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>
                <Search />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by title or content"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search skills"
            />
          </InputGroup>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 gap-x-0 ring border ring-offset-3 ring-offset-background ring-border overflow-hidden rounded-2xl relative',
          className,
        )}
      >
        <div className="absolute inset-0 size-full bg-pattern z-0 blur-[0.5px] opacity-30" />
        {filteredSkills.map((skill: Skill, index: number) => (
          <SkillCard key={skill.slug} skill={skill} style={{ zIndex: 100 - index }} />
        ))}
        {filteredSkills.length === 0 && (
          <div className="p-6 text-sm text-foreground/70 text-center col-span-full z-1">
            No skills match that search. Try a different phrase or clear the
            filter.
          </div>
        )}
      </div>
    </>
  )
}
