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
  const uniqueCategories = Array.from(
    new Set(allSkills.map((skill) => skill.category)),
  )
  return uniqueCategories.map((category) => ({
    name: category,
    total: getSkillsByCategory(category).length,
  }))
}

/**
 * Get all unique authors
 */
export function getAuthors(): {
  name: string
  url?: string
  avatar?: string
  github?: string
}[] {
  const authorMap = new Map<
    string,
    {
      name: string
      url?: string
      avatar?: string
      github?: string
    }
  >()

  allSkills.forEach((skill) => {
    const authorName = skill.author.name
    if (!authorMap.has(authorName)) {
      authorMap.set(authorName, {
        name: skill.author.name,
        url: skill.author.url,
        avatar: skill.author.avatar,
        github: getGithubRepoHandle(skill.githubUrl),
      })
    }
  })

  return Array.from(authorMap.values())
}

// Export the Skill type
export type { Skill } from './skill'
