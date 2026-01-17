export type Skill = {
  id: string
  title: string
  when: string
  category: string
  content: string
  author?: {
    name: string
    url?: string
    avatar?: string
  }
  tags?: string[]
  github?: string
  website?: string
  mdPath?: string
  verified?: boolean
}
