import { commands } from './commands'
import type { Skill } from './skill'
import { agentSkills } from './skills'
import { subagents } from './subagents'

// Combine all skills
const allSkills: Skill[] = [...agentSkills, ...commands, ...subagents]

/**
 * Get all skills
 */
export function getAllSkills(): Skill[] {
  return allSkills
}

/**
 * Get a skill by slug
 */
export function getSkillBySlug(slug: string): Skill | undefined {
  return allSkills.find((skill) => skill.slug === slug)
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

/**
 * Get all unique categories
 */
export function getAuthors(): string[] {
  return Array.from(new Set(allSkills.map((skill) => skill.author.name)))
}

// Export the Skill type
export type { Skill } from './skill'
