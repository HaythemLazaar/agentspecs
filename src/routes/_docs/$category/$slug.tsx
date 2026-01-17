import { createFileRoute, notFound } from '@tanstack/react-router'

import { NotFound } from '@/components/not-found'
import { SkillContent } from '@/components/skill-content'
import { SkillDetails } from '@/components/skill-details'
import { SkillDocs } from '@/components/skill-docs'
import { getSkillBySlug, Skill } from '@/data'

export const Route = createFileRoute('/_docs/$category/$slug')({
  loader: async ({ params }) => {
    const skill = getSkillBySlug(params.slug)
    if (!skill) {
      throw notFound()
    }
    console.log(params.slug)

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
          title: `${skill.author.name}/${skill.name} - AgentSpecs`,
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

  return (
    <div className="py-4 sm:py-6 flex flex-col max-sm:gap-6 gap-10">
      <SkillDetails skill={skill} />
      <SkillContent content={skill.content} />
      <SkillDocs skill={skill} />
    </div>
  )
}
