import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className="p-4 mx-auto flex w-full max-w-6xl items-center justify-between sm:px-6 lg:px-10">
      <h1 className="text-xl font-medium tracking-tighter font-mono">
        <Link to="/">
          <img
            src="/logo512.png"
            alt="AgentSpecs"
            className="border border-neutral-300 shadow-xs shadow-neutral-600/10 rounded-lg"
            width={32}
            height={32}
          />
        </Link>
      </h1>
      <div className="flex items-center gap-4 text-sm font-normal">
        <Link to="/">Resources</Link>
        <Link to="/">How to use Skills?</Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
