import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <>
      <header className="p-4 mx-auto flex w-full max-w-6xl items-center justify-between sm:px-6 lg:px-10">
        <h1 className="text-xl font-semibold">
          <Link to="/">AgentSpecs</Link>
        </h1>
        <div className="flex items-center gap-4 text-sm font-normal">
          <Link to="/">Resources</Link>
          <Link to="/">How to use Skills?</Link>
        </div>
      </header>
    </>
  )
}
