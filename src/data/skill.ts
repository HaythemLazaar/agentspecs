export type Skill = {
  slug: string
  name: string
  category: string
  content: string
  rawMarkdownUrl: string
  githubUrl?: string
  author: {
    name: string
    url?: string
    avatar?: string
  }
  tags?: string[]
  verified?: boolean
  customInstall?: string
}
