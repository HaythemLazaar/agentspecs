import { Skill } from '../skill'
import { anthropicSkills } from './anthropic'
import { vercelSkills } from './vercel'

export const agentSkills: Skill[] = [...anthropicSkills, ...vercelSkills]
