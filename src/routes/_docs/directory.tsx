import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { getAuthors } from '@/data'
import { IconCaretRightFilled } from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Search } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_docs/directory')({
  loader: async ({}) => {
    const authors = getAuthors()
    return {
      authors,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { authors } = Route.useLoaderData() as {
    authors: { name: string; url?: string; avatar?: string; github?: string }[]
  }
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredAuthors = normalizedQuery
    ? authors.filter((author) =>
        author.name.toLowerCase().includes(normalizedQuery),
      )
    : authors

  return (
    <div className="space-y-6 py-4 sm:py-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">Skills Directory</h1>
        <p className="text-muted-foreground">
          Discover all experts behind the skills.
        </p>
      </div>
      <div className="w-full">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search authors"
          />
        </InputGroup>
      </div>
      <div className="flex flex-col divide-y">
        {filteredAuthors.map((author) => (
          <AuthorCard key={author.name} author={author} />
        ))}
      </div>
    </div>
  )
}

function AuthorCard({
  author,
}: {
  author: { name: string; url?: string; avatar?: string; github?: string }
}) {
  return (
    <div className="flex items-center gap-4 border-b py-6">
      <Avatar size="lg">
        <AvatarImage src={author.avatar} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium tracking-tight">
          {author.name}
        </span>
        <Link to={`https://github.com/${author.github}`} target="_blank">
          <span className="text-[11px] font-mono tracking-tighter text-foreground px-2 py-0.5 w-fit rounded-full bg-muted flex items-center gap-1 group/chip">
            <Avatar size="xs" className="size-3!">
              <AvatarImage src="https://github.com/favicon.ico" />
            </Avatar>
            {author.github}
            <ArrowUpRight className="size-3 group-hover/chip:rotate-45 transition-all" />
          </span>
        </Link>
      </div>
      <Link to="/$author" params={{ author: author.name }} className="ml-auto">
        <Button
          variant="outline"
          className="ml-auto group/button overflow-hidden"
        >
          View Skills{' '}
          <span className="relative size-3 ">
            <IconCaretRightFilled className="absolute top-0 left-0 size-3 opacity-0 group-hover/button:opacity-100 -translate-x-3 group-hover/button:translate-x-0 transition-all" />
            <IconCaretRightFilled
              className="absolute text-muted-foreground top-0 left-0 size-3 group-hover/button:opacity-0 group-hover/button:translate-x-5 transition-all"
              stroke={1}
            />
          </span>
        </Button>
      </Link>
    </div>
  )
}
