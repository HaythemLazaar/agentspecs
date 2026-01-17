import { Card, CardContent } from './ui/card'

export function SkillContent({ content }: { content: string }) {
  return (
    <Card className="max-w-2xl w-full shadow-xs rounded-md overflow-y-auto max-h-100">
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-mono text-xs text-foreground">
            {content}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
