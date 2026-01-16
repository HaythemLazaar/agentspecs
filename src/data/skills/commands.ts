import type { Skill } from './agent-skills'

export const commands: Skill[] = [
  {
    id: 'commands.copy-snippet',
    title: 'Copy Snippet',
    when: '2026-01-03',
    category: 'commands',
    content: `Copies a prepared snippet or checklist into the clipboard in a consistent
format, ready to paste into docs, issues, or tickets.

Outputs a brief confirmation for the user.`,
  },
  {
    id: 'commands.install-skill',
    title: 'Install Skill',
    when: '2026-01-02',
    category: 'commands',
    content: `Adds a skill to the agent workspace and validates that the required files and
metadata are present.

Runs a fast consistency check and reports any missing dependencies.`,
  },
]
