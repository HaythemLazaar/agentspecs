import { createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { FileCard } from '@/components/file-card'
import { NotFound } from '@/components/not-found'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { getSkillsByCategory, Skill } from '@/data/skills'

export const Route = createFileRoute('/_docs/$category/')({
  loader: async ({ params }) => {
    const skills = getSkillsByCategory(params.category)
    return {
      category: params.category,
      skills: skills,
    }
  },
  head: ({ loaderData }) => {
    const { category, skills } = loaderData as {
      category: string
      skills: Skill[]
    }
    const categoryTitle = category
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    const description = `Browse ${skills.length} ${categoryTitle.toLowerCase()} skill${skills.length !== 1 ? 's' : ''} for building reliable AI agents.`

    return {
      meta: [
        {
          title: `${categoryTitle} Skills - AgentSpecs`,
        },
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: `${categoryTitle} Skills - AgentSpecs`,
        },
        {
          property: 'og:description',
          content: description,
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
    }
  },
  component: CategoryPage,
  notFoundComponent: NotFound,
})

function CategoryPage() {
  const { category, skills } = Route.useLoaderData()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredSkills = normalizedQuery
    ? skills.filter((skill: Skill) =>
        [skill.title, skill.content, skill.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : skills

  const categoryTitle = category
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="space-y-6 py-4 sm:py-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">{categoryTitle}</h1>
        <p className="text-muted-foreground">
          Browse {skills.length} {categoryTitle.toLowerCase()} for building
          reliable coding agents.
        </p>
      </div>

      <div className="w-full max-w-xl">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 ring ring-border overflow-hidden rounded-lg bg-pattern">
        {filteredSkills.map((skill: Skill) => (
          <FileCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}
