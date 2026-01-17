import { SkillGrid } from '@/components/skill-grid'
import { getSkillsByAuthor } from '@/data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs/$author/')({
  loader: async ({ params }) => {
    const skills = getSkillsByAuthor(params.author)
    return {
      author: params.author,
      skills: skills,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { author, skills } = Route.useLoaderData()
  return (
    <div className="space-y-6 py-4 sm:py-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight capitalize">
          {author}
        </h1>
        <p className="text-muted-foreground">Browse skills made by {author}.</p>
      </div>

      <SkillGrid skills={skills} />
    </div>
  )
}
