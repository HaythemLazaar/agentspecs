import { createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { FileCard } from '@/components/file-card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import type { Skill } from '@/data'
import { getAllSkills } from '@/data'

export const Route = createFileRoute('/')({
  loader: async () => {
    return { skills: getAllSkills() }
  },
  head: () => ({
    meta: [
      {
        title: 'AgentSpecs - Power up your coding agents',
      },
      {
        name: 'description',
        content:
          'Browse vetted building blocks for reliable AI agents. Search for a specific pattern, then install or copy the exact spec you need.',
      },
      {
        property: 'og:title',
        content: 'AgentSpecs - Power up your coding agents',
      },
      {
        property: 'og:description',
        content:
          'Browse vetted building blocks for reliable AI agents. Search for a specific pattern, then install or copy the exact spec you need.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
    ],
  }),
  component: Home,
})

function Home() {
  const { skills } = Route.useLoaderData()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredSkills = normalizedQuery
    ? skills.filter((skill: Skill) =>
        [skill.title, skill.content, skill.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : skills

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-3xl font-semibold sm:text-4xl">
              Power up your coding agents
            </h1>
            <p className="text-pretty text-sm text-muted-foreground sm:text-base">
              Browse vetted building blocks for reliable AI agents. Search for a
              specific pattern, then install or copy the exact spec you need.
            </p>
          </div>
          <div className="w-full max-w-2xl">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search by title, category, or content"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search skills"
              />
            </InputGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-2 ring ring-border overflow-hidden rounded-lg bg-pattern">
          {filteredSkills.map((skill: Skill) => (
            <FileCard key={skill.id} skill={skill} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            No skills match that search. Try a different phrase or clear the
            filter.
          </div>
        )}
      </section>
    </main>
  )
}
