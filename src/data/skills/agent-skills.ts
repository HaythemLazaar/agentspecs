import { Skill } from '../skill'

export const agentSkills: Skill[] = [
  {
    id: 'agent-skills.context-boot',
    title: 'Context Boot',
    when: '2026-01-10',
    category: 'agent-skills',
    content: `Sets up a clean, minimal context block before any action so the agent stays
grounded in scope, constraints, and expected outputs.

Includes a short checklist to prevent hidden assumptions from slipping into the
first response.`,
  },
  {
    id: 'agent-skills.failure-budget',
    title: 'Failure Budget',
    when: '2026-01-12',
    category: 'agent-skills',
    content: `Defines an explicit error budget for a task and chooses safer defaults when the
budget is small.

Captures what to skip, what to double-check, and what to log for follow-up.`,
  },
]
