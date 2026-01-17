import { SkillGrid } from '@/components/skill-grid'
import { SkillInstall } from '@/components/skill-install'
import { LinkChip } from '@/components/ui/link-chip'
import { getSkillsByAuthor } from '@/data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs/$author/skills')({
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
    <div className="space-y-6 sm:space-y-10 py-4 sm:py-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight capitalize inln">
          {author}
        </h1>
        <p className="text-muted-foreground mb-3">
          Browse skills made by {author}.
        </p>
        {skills && skills.length > 0 && (
          <LinkChip link={skills[0].githubUrl} label="GitHub" />
        )}
      </div>

      {skills && skills.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Install</h2>
          <SkillInstall skill={skills[0]} installAll={true} />
        </div>
      )}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <SkillGrid skills={skills} />
      </div>
    </div>
  )
}
