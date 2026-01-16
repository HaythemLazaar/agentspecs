import { createFileRoute, notFound } from '@tanstack/react-router'
import { Copy, Download } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getSkillById } from '@/data/skills'

export const Route = createFileRoute('/skills/$skillId')({
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

  function copyToClipboard(value: string) {
    if (!navigator?.clipboard?.writeText) return
    void navigator.clipboard.writeText(value)
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-10">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <CardTitle className="text-2xl">{skill.title}</CardTitle>
                <CardDescription>
                  <span className="tabular-nums">{skill.when}</span>
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="uppercase">
                  {skill.category}
                </Badge>
                <div className="flex items-center gap-1">
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
                    onClick={() => copyToClipboard(skill.content)}
                  >
                    <Copy />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                {skill.content}
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
