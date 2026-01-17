import { Card, CardContent } from './ui/card'

export function SkillContent({ content }: { content: string }) {
  return (
    <Card className="w-full shadow-xs rounded-2xl overflow-y-auto max-h-120 ring-offset-3 ring-offset-background border ring-border/70">
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
