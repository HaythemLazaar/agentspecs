import type { Skill } from './agent-skills'
import { agentSkills } from './agent-skills'
import { commands } from './commands'
import { subagents } from './subagents'
import { workflows } from './workflows'

// Combine all skills
const allSkills: Skill[] = [
  ...agentSkills,
  ...commands,
  ...subagents,
  ...workflows,
]

/**
 * Get all skills
 */
export function getAllSkills(): Skill[] {
  return allSkills
}

/**
 * Get a skill by ID
 */
export function getSkillById(id: string): Skill | undefined {
  return allSkills.find((skill) => skill.id === id)
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): Skill[] {
  return allSkills.filter((skill) => skill.category === category)
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(allSkills.map((skill) => skill.category)))
}

// Export the Skill type
export type { Skill } from './agent-skills'
