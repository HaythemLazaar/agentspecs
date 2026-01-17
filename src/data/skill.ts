export type Skill = {
  slug: string
  title: string
  category: string
  content: string
  rawMarkdownUrl: string
  author?: {
    name: string
    url?: string
    avatar?: string
  }
  tags?: string[]
  verified?: boolean
}
