import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { Card, CardContent } from '@/components/ui/card'
import { getSkillById } from '@/data/skills'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_docs/$category/$skillId')({
  loader: async ({ params }) => {
    const skill = getSkillById(params.skillId)
    if (!skill) {
      throw notFound()
    }
    return { skill }
  },
  head: ({ loaderData }) => {
    const { skill } = loaderData
    const description =
      skill.content.length > 160
        ? `${skill.content.slice(0, 160).trim()}…`
        : skill.content

    return {
      meta: [
        {
          title: `${skill.title} - AgentSpecs`,
        },
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: `${skill.title} - AgentSpecs`,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: skill.title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ],
    }
  },
  component: SkillPage,
})

function SkillPage() {
  const { skill } = Route.useLoaderData()
  const categoryTitle = skill.category
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  return (
    <div className="space-y-6 py-4 sm:py-6">
      <Link to="/$category" params={{ category: skill.category }}>
        <span className="text-xs text-foreground flex items-center gap-2 bg-muted px-2 py-1 rounded-md w-fit capitalize">
          <ArrowLeft className="size-4" /> {categoryTitle.toLowerCase()}
        </span>
      </Link>
      <h1 className="text-4xl font-bold tracking-tight mt-4">{skill.title}</h1>

      <Card className="max-w-2xl shadow-xs rounded-lg">
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
              {skill.content}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
