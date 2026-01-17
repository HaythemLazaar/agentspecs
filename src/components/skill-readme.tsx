import { Skill } from '@/data/skill'
import { getGithubRepoHandle } from '@/lib/utils'
import { IconSquareChevronRight } from '@tabler/icons-react'
import { useState } from 'react'
import { CopyButton } from './copy-button'
import { Card, CardContent } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function SkillReadme({ skill }: { skill: Skill }) {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Installation</h2>
        <InstallSkill skill={skill} />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Explicit usage as a command</h2>
        <UsageSkill skill={skill} />
      </div>
    </>
  )
}

function InstallSkill({ skill }: { skill: Skill }) {
  const [tab, setTab] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>(
    (localStorage.getItem('install') as 'pnpm' | 'npm' | 'yarn' | 'bun') ||
      'pnpm',
  )

  const handleTabChange = (value: string) => {
    setTab(value as 'pnpm' | 'npm' | 'yarn' | 'bun')
    localStorage.setItem('install', value)
  }

  const githubHandle = getGithubRepoHandle(skill.githubUrl)

  const command = {
    pnpm: `pnpm dlx add-skill ${githubHandle} --skill ${skill.name}`,
    npm: `npx add-skill ${githubHandle} --skill ${skill.name}`,
    yarn: `yarn dlx add-skill ${githubHandle} --skill ${skill.name}`,
    bun: `bunx add-skill ${githubHandle} --skill ${skill.name}`,
  }

  return (
    <Tabs
      value={tab}
      onValueChange={handleTabChange}
      className="border border-border rounded-2xl gap-1 bg-muted overflow-hidden pt-1 relative"
    >
      <CopyButton text={command[tab]} className="absolute top-2 right-2" />
      <TabsList className="px-4 bg-transparent font-mono">
        <IconSquareChevronRight className="size-4 text-foreground mr-2" />
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="bun">bun</TabsTrigger>
      </TabsList>
      <div className="rounded-t-2xl border-t border-border bg-background">
        <TabsContent value={tab} className="p-4">
          <code className="whitespace-pre-wrap font-mono text-xs text-foreground">
            {command[tab]}
          </code>
        </TabsContent>
      </div>
    </Tabs>
  )
}

function UsageSkill({ skill }: { skill: Skill }) {
  return (
    <Card className="">
      <CardContent className="flex flex-col gap-2">
        <code className="whitespace-pre-wrap font-mono text-xs text-foreground inline-flex items-center gap-1">
          /{skill.name}{' '}
          <span className="text-muted-foreground">- Review...</span>
        </code>
        <code className="whitespace-pre-wrap font-mono text-xs text-foreground inline-flex items-center gap-1">
          /{skill.name} {'<file> '}
          <span className="text-muted-foreground">- Review exact file...</span>
        </code>
      </CardContent>
    </Card>
  )
}
