import { Skill } from '@/data/skill'
import { getGithubRepoHandle } from '@/lib/utils'
import { IconSquareChevronRight } from '@tabler/icons-react'
import { createClientOnlyFn } from '@tanstack/react-start'
import { useState } from 'react'
import { CopyButton } from './copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const getDefaultTab = createClientOnlyFn(() => {
  return (
    (localStorage.getItem('install') as 'pnpm' | 'npm' | 'yarn' | 'bun') ||
    'pnpm'
  )
})

export function SkillInstall({
  skill,
  installAll = false,
}: {
  skill: Skill
  installAll?: boolean
}) {
  const [tab, setTab] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>(
    getDefaultTab(),
  )

  if (!skill.githubUrl) {
    return (
      <code className="relative whitespace-pre-wrap border font-mono text-xs text-foreground block p-4 bg-white dark:bg-background rounded-2xl">
        {skill.customInstall || 'No installation instructions available'}
        {skill.customInstall && (
          <CopyButton
            text={skill.customInstall}
            className="absolute top-3 right-3"
          />
        )}
      </code>
    )
  }

  const handleTabChange = (value: string) => {
    setTab(value as 'pnpm' | 'npm' | 'yarn' | 'bun')
    localStorage.setItem('install', value)
  }

  const githubHandle = getGithubRepoHandle(skill.githubUrl)

  const command = {
    pnpm: installAll
      ? `pnpm dlx add-skill ${githubHandle}`
      : `pnpm dlx add-skill ${githubHandle} --skill ${skill.name}`,
    npm: installAll
      ? `npx add-skill ${githubHandle}`
      : `npx add-skill ${githubHandle} --skill ${skill.name}`,
    yarn: installAll
      ? `yarn dlx add-skill ${githubHandle}`
      : `yarn dlx add-skill ${githubHandle} --skill ${skill.name}`,
    bun: installAll
      ? `bunx add-skill ${githubHandle}`
      : `bunx add-skill ${githubHandle} --skill ${skill.name}`,
  }

  return (
    <Tabs
      value={tab}
      onValueChange={handleTabChange}
      className="border border-border rounded-2xl gap-1 bg-muted/50 overflow-hidden pt-1 relative"
    >
      <CopyButton text={command[tab]} className="absolute top-2 right-2" />
      <TabsList className="px-4 bg-transparent font-mono">
        <IconSquareChevronRight className="size-4 text-foreground/70 mr-2" />
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
