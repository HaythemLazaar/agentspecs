import { getGithubRepoHandle } from '@/lib/utils'
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
 * Get skills by author
 */
export function getSkillsByAuthor(author: string): Skill[] {
  return allSkills.filter((skill) => skill.author.name === author)
}

/**
 * Get all unique categories
 */
export function getCategories(): { name: string; total: number }[] {
  return Array.from(
    new Set(
      allSkills.map((skill) => {
        return {
          name: skill.category,
          total: getSkillsByCategory(skill.category).length,
        }
      }),
    ),
  )
}

/**
 * Get all unique categories
 */
export function getAuthors(): {
  name: string
  url?: string
  avatar?: string
}[] {
  return Array.from(
    new Set(
      allSkills.map((skill) => ({
        name: skill.author.name,
        url: skill.author.url,
        avatar: skill.author.avatar,
        github: getGithubRepoHandle(skill.githubUrl),
      })),
    ),
  )
}

// Export the Skill type
export type { Skill } from './skill'
