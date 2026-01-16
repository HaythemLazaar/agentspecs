import { createFileRoute } from '@tanstack/react-router'
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
import { cn } from '@/lib/utils'

type SkillItem = {
  id: string
  title: string
  when: string
  category: string
  preview: string
  raw: string
}

const rawSkills = import.meta.glob('/skills/**/skill.md', {
  as: 'raw',
  eager: true,
}) as Record<string, string>

const skills = Object.entries(rawSkills).map(([path, raw]) =>
  parseSkillFile(path, raw),
)

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredSkills = normalizedQuery
    ? skills.filter((skill) =>
        [skill.title, skill.preview, skill.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : skills

  return (
    <main className="min-h-dvh bg-background text-foreground">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.id}
              className={cn(
                'group/skill relative',
                // 'before:absolute before:top-0 before:left-0 before:size-2 before:border-l before:border-t before:border-neutral-500',
                // 'after:absolute after:top-0 after:right-0 after:size-2 after:border-r after:border-t after:border-neutral-500',
              )}
            >
              {/* <div
                className={cn(
                  'before:absolute before:bottom-0 before:left-0 before:size-2 before:border-l before:border-b before:border-neutral-500',
                  'after:absolute after:bottom-0 after:right-0 after:size-2 after:border-r after:border-b after:border-neutral-500',
                )}
              /> */}
              <CardHeader className="gap-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-base">{skill.title}</CardTitle>
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
              {/* <CardFooter className="text-xs text-muted-foreground">
                <span className="tabular-nums">{skill.id}</span>
              </CardFooter> */}
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

function parseSkillFile(path: string, raw: string): SkillItem {
  const { frontmatter, body } = splitFrontmatter(raw)
  const categoryFromPath = path.split('/skills/')[1]?.split('/')[0] ?? 'skills'
  const id = path
    .replace('/skills/', '')
    .replace('/skill.md', '')
    .replace(/\//g, '.')

  return {
    id,
    title: frontmatter.title ?? toTitleCase(id.split('.').pop() ?? 'Skill'),
    when: frontmatter.when ?? frontmatter.updated ?? 'Unknown',
    category: frontmatter.category ?? categoryFromPath,
    preview: buildPreview(body),
    raw,
  }
}

function splitFrontmatter(source: string): {
  frontmatter: Record<string, string>
  body: string
} {
  const frontmatter: Record<string, string> = {}
  const trimmed = source.trim()

  if (!trimmed.startsWith('---')) {
    return { frontmatter, body: trimmed }
  }

  const parts = trimmed.split('\n')
  const endIndex = parts.slice(1).findIndex((line) => line.trim() === '---')

  if (endIndex === -1) {
    return { frontmatter, body: trimmed }
  }

  const frontmatterLines = parts.slice(1, endIndex + 1)
  const bodyLines = parts.slice(endIndex + 2)

  frontmatterLines.forEach((line) => {
    const [key, ...rest] = line.split(':')
    if (!key || rest.length === 0) return
    frontmatter[key.trim()] = rest.join(':').trim()
  })

  return {
    frontmatter,
    body: bodyLines.join('\n').trim(),
  }
}

function buildPreview(body: string) {
  if (!body) return 'No preview available.'
  const cleaned = body
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

function copyToClipboard(value: string) {
  if (!navigator?.clipboard?.writeText) return
  void navigator.clipboard.writeText(value)
}

function toTitleCase(value: string) {
  return value
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
