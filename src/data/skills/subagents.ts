import type { Skill } from './agent-skills'

export const subagents: Skill[] = [
  {
    id: 'subagents.edge-reviewer',
    title: 'Edge Reviewer',
    when: '2026-01-05',
    category: 'subagents',
    content: `Checks edge cases and regression risks before a change ships, focusing on
nullable inputs, empty states, and error boundaries.

Flags missing tests or guard rails with short, actionable notes.`,
  },
  {
    id: 'subagents.log-sniffer',
    title: 'Log Sniffer',
    when: '2026-01-08',
    category: 'subagents',
    content: `Scans build and runtime logs to isolate the first actionable error and
summarizes the root cause with the smallest likely fix.

Returns a compact snippet list to keep the main agent focused.`,
  },
]
