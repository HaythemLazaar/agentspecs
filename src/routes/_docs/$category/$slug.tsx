import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { NotFound } from '@/components/not-found'
import { SkillContent } from '@/components/skill-content'
import { getSkillBySlug, Skill } from '@/data'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_docs/$category/$slug')({
  loader: async ({ params }) => {
    const skill = getSkillBySlug(params.slug)
    if (!skill) {
      throw notFound()
    }

    return {
      skill,
    }
  },
  head: ({ loaderData }) => {
    const skill = loaderData?.skill as Skill | undefined
    if (!skill) {
      return {
        meta: [
          {
            title: 'Skill not found - AgentSpecs',
          },
          {
            name: 'description',
            content: 'The skill you are looking for does not exist.',
          },
          {
            property: 'og:title',
            content: 'Skill not found - AgentSpecs',
          },
        ],
      }
    }
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
  notFoundComponent: NotFound,
})

function SkillPage() {
  const { skill } = Route.useLoaderData() as {
    skill: Skill
  }
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

      <div className="flex-1 min-w-0">
        <h1 className="text-4xl font-bold tracking-tight mt-4 mb-6">
          {skill.title}
        </h1>

        <div className="space-y-8">
          <SkillContent content={skill.content} />
        </div>
      </div>
    </div>
  )
}
