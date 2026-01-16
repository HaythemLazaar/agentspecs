import { createFileRoute, Link } from '@tanstack/react-router'
import { Copy, Download, Search } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { getSkillsByCategory } from '@/data/skills'
import { cn } from '@/lib/utils'

type SkillItem = {
  id: string
  title: string
  when: string
  category: string
  preview: string
  raw: string
}

function buildPreview(content: string) {
  if (!content) return 'No preview available.'
  const cleaned = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[`#>*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (cleaned.length <= 180) {
    return cleaned
  }

  return `${cleaned.slice(0, 180).trim()}…`
}

function skillToItem(
  skill: ReturnType<typeof getSkillsByCategory>[0],
): SkillItem {
  return {
    id: skill.id,
    title: skill.title,
    when: skill.when,
    category: skill.category,
    preview: buildPreview(skill.content),
    raw: skill.content,
  }
}

export const Route = createFileRoute('/category/$category')({
  loader: async ({ params }) => {
    const skills = getSkillsByCategory(params.category)
    return {
      category: params.category,
      skills: skills.map(skillToItem),
    }
  },
  head: ({ loaderData }) => {
    const { category, skills } = loaderData
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
})

function CategoryPage() {
  const { category, skills } = Route.useLoaderData()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredSkills = normalizedQuery
    ? skills.filter((skill) =>
        [skill.title, skill.preview, skill.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : skills

  const categoryTitle = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  function copyToClipboard(value: string) {
    if (!navigator?.clipboard?.writeText) return
    void navigator.clipboard.writeText(value)
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-3xl font-semibold sm:text-4xl">
              {categoryTitle} Skills
            </h1>
            <p className="text-pretty text-sm text-muted-foreground sm:text-base">
              Browse {skills.length} {categoryTitle.toLowerCase()} skill
              {skills.length !== 1 ? 's' : ''} for building reliable AI agents.
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
                placeholder="Search by title or content"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search skills"
              />
            </InputGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className={cn('group/skill relative')}>
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
                        onClick={() =>
                          copyToClipboard(`agentspecs install ${skill.id}`)
                        }
                      >
                        <Download />
                      </Button>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label={`Copy ${skill.title}`}
                        onClick={() => copyToClipboard(skill.raw)}
                      >
                        <Copy />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="size-full bg-neutral-50 p-1">
                  <p className="text-pretty text-[10px] font-mono text-muted-foreground">
                    {skill.preview}
                  </p>
                </div>
              </CardContent>
            </Card>
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
