import { createFileRoute } from '@tanstack/react-router'

import { NotFound } from '@/components/not-found'
import { SkillGrid } from '@/components/skill-grid'
import { getSkillsByCategory, Skill } from '@/data'

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

      <SkillGrid skills={skills} />
    </div>
  )
}
