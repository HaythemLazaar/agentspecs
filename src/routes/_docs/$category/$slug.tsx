import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { NotFound } from '@/components/not-found'
import { SkillContent } from '@/components/skill-content'
import { SkillDetails } from '@/components/skill-details'
import { SkillReadme } from '@/components/skill-readme'
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
          title: `${skill.name} - AgentSpecs`,
        },
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: `${skill.name} - AgentSpecs`,
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
          content: skill.name,
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
    <div className="py-4 sm:py-6 flex flex-col max-sm:gap-6 gap-10">
      <Link to="/$category" params={{ category: skill.category }}>
        <span className="text-xs text-foreground flex items-center gap-2 rounded-md w-fit capitalize hover:opacity-80 transition-all">
          <ArrowLeft className="size-3.5" /> {categoryTitle}
        </span>
      </Link>
      <SkillDetails skill={skill} />
      <SkillContent content={skill.content} />
      <SkillReadme skill={skill} />
    </div>
  )
}
