import type { Skill } from './agent-skills'

export const workflows: Skill[] = [
  {
    id: 'workflows.release-check',
    title: 'Release Check',
    when: '2026-01-07',
    category: 'workflows',
    content: `Defines a short release checklist with preflight, deploy, and post-deploy
verification steps.

Focuses on observability and rollback readiness.`,
  },
  {
    id: 'workflows.triage-loop',
    title: 'Triage Loop',
    when: '2026-01-06',
    category: 'workflows',
    content: `Cycles through reproduce, isolate, fix, and verify with a lightweight checklist
to keep complex bugs from drifting.

Captures the minimal repro and the final verification step.`,
  },
]
