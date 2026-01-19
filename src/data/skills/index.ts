import { Skill } from '../skill'
import { anthropicSkills } from './anthropic'
import { betterAuthSkills } from './better-auth'
import { vercelSkills } from './vercel'

export const agentSkills: Skill[] = [
  ...anthropicSkills,
  ...vercelSkills,
  ...betterAuthSkills,
  {
    name: 'rams',
    slug: 'rams',
    category: 'agent-skills',
    author: {
      name: 'rams',
      url: 'https://www.rams.ai/',
      avatar: 'https://www.rams.ai/favicon.png',
    },
    rawMarkdownUrl: 'https://www.rams.ai/rams.md',
    content: `---
description: Run accessibility and visual design review
---

# Rams Design Review

You are Rams, an expert design engineer reviewing code for accessibility and visual design issues.

## Mode

If \`$ARGUMENTS\` is provided, analyze that specific file.
If \`$ARGUMENTS\` is empty, ask the user which file(s) to review, or offer to scan the project for component files.

---

## 1. Accessibility Review (WCAG 2.1)

### Critical (Must Fix)

| Check | WCAG | What to look for |
|-------|------|------------------|
| Images without alt | 1.1.1 | \`<img>\` without \`alt\` attribute |
| Icon-only buttons | 4.1.2 | \`<button>\` with only SVG/icon, no \`aria-label\` |
| Form inputs without labels | 1.3.1 | \`<input>\`, \`<select>\`, \`<textarea>\` without associated \`<label>\` or \`aria-label\` |
| Non-semantic click handlers | 2.1.1 | \`<div onClick>\` or \`<span onClick>\` without \`role\`, \`tabIndex\`, \`onKeyDown\` |
| Missing link destination | 2.1.1 | \`<a>\` without \`href\` using only \`onClick\` |

### Serious (Should Fix)

| Check | WCAG | What to look for |
|-------|------|------------------|
| Focus outline removed | 2.4.7 | \`outline-none\` or \`outline: none\` without visible focus replacement |
| Missing keyboard handlers | 2.1.1 | Interactive elements with \`onClick\` but no \`onKeyDown\`/\`onKeyUp\` |
| Color-only information | 1.4.1 | Status/error indicated only by color (no icon/text) |
| Touch target too small | 2.5.5 | Clickable elements smaller than 44x44px |

### Moderate (Consider Fixing)

| Check | WCAG | What to look for |
|-------|------|------------------|
| Heading hierarchy | 1.3.1 | Skipped heading levels (h1 → h3) |
| Positive tabIndex | 2.4.3 | \`tabIndex\` > 0 (disrupts natural tab order) |
| Role without required attributes | 4.1.2 | \`role="button"\` without \`tabIndex="0"\` |

---

## 2. Visual Design Review

### Layout & Spacing
- Inconsistent spacing values
- Overflow issues, alignment problems
- Z-index conflicts

### Typography
- Mixed font families, weights, or sizes
- Line height issues
- Missing font fallbacks

### Color & Contrast
- Contrast ratio below 4.5:1
- Missing hover/focus states
- Dark mode inconsistencies

### Components
- Missing button states (disabled, loading, hover, active, focus)
- Missing form field states (error, success, disabled)
- Inconsistent borders, shadows, or icon sizing

---

## Output Format

\`\`\`
═══════════════════════════════════════════════════
RAMS DESIGN REVIEW: [filename]
═══════════════════════════════════════════════════

CRITICAL (X issues)
───────────────────
[A11Y] Line 24: Button missing accessible name
  <button><CloseIcon /></button>
  Fix: Add aria-label="Close"
  WCAG: 4.1.2

SERIOUS (X issues)
──────────────────
...

═══════════════════════════════════════════════════
SUMMARY: X critical, X serious, X moderate
Score: XX/100
═══════════════════════════════════════════════════
\`\`\`

---

## Guidelines

1. Read the file(s) first before making assessments
2. Be specific with line numbers and code snippets
3. Provide fixes, not just problems
4. Prioritize critical accessibility issues first

If asked, offer to fix the issues directly.
`,
    customInstall: 'curl -fsSL https://rams.ai/install | bash',
  },
  {
    name: 'ui-skills',
    slug: 'ui-skills',
    category: 'agent-skills',
    author: {
      name: 'ibelick',
      url: 'https://ibelick.com',
      avatar: 'https://ibelick.com/favicon.ico?v=2',
    },
    rawMarkdownUrl:
      'https://raw.githubusercontent.com/ibelick/ui-skills/refs/heads/main/src/SKILL.md',
    githubUrl: 'https://github.com/ibelick/ui-skills/tree/main/src',
    content: `---
name: ui-skills
description: Opinionated constraints for building better interfaces with agents.
---

# UI Skills

When invoked, apply these opinionated constraints for building better interfaces.

## How to use

- \`/ui-skills\`  
  Apply these constraints to any UI work in this conversation.

- \`/ui-skills <file>\`  
  Review the file against all constraints below and output:
  - violations (quote the exact line/snippet)
  - why it matters (1 short sentence)
  - a concrete fix (code-level suggestion)

## Stack

- MUST use Tailwind CSS defaults unless custom values already exist or are explicitly requested
- MUST use \`motion/react\` (formerly \`framer-motion\`) when JavaScript animation is required
- SHOULD use \`tw-animate-css\` for entrance and micro-animations in Tailwind CSS
- MUST use \`cn\` utility (\`clsx\` + \`tailwind-merge\`) for class logic

## Components

- MUST use accessible component primitives for anything with keyboard or focus behavior (\`Base UI\`, \`React Aria\`, \`Radix\`)
- MUST use the project’s existing component primitives first
- NEVER mix primitive systems within the same interaction surface
- SHOULD prefer \`[Base UI](https://base-ui.com/react/components)\` for new primitives if compatible with the stack
- MUST add an \`aria-label\` to icon-only buttons
- NEVER rebuild keyboard or focus behavior by hand unless explicitly requested

## Interaction

- MUST use an \`AlertDialog\` for destructive or irreversible actions
- SHOULD use structural skeletons for loading states
- NEVER use \`h-screen\`, use \`h-dvh\`
- MUST respect \`safe-area-inset\` for fixed elements
- MUST show errors next to where the action happens
- NEVER block paste in \`input\` or \`textarea\` elements

## Animation

- NEVER add animation unless it is explicitly requested
- MUST animate only compositor props (\`transform\`, \`opacity\`)
- NEVER animate layout properties (\`width\`, \`height\`, \`top\`, \`left\`, \`margin\`, \`padding\`)
- SHOULD avoid animating paint properties (\`background\`, \`color\`) except for small, local UI (text, icons)
- SHOULD use \`ease-out\` on entrance
- NEVER exceed \`200ms\` for interaction feedback
- MUST pause looping animations when off-screen
- SHOULD respect \`prefers-reduced-motion\`
- NEVER introduce custom easing curves unless explicitly requested
- SHOULD avoid animating large images or full-screen surfaces

## Typography

- MUST use \`text-balance\` for headings and \`text-pretty\` for body/paragraphs
- MUST use \`tabular-nums\` for data
- SHOULD use \`truncate\` or \`line-clamp\` for dense UI
- NEVER modify \`letter-spacing\` (\`tracking-*\`) unless explicitly requested

## Layout

- MUST use a fixed \`z-index\` scale (no arbitrary \`z-*\`)
- SHOULD use \`size-*\` for square elements instead of \`w-*\` + \`h-*\`

## Performance

- NEVER animate large \`blur()\` or \`backdrop-filter\` surfaces
- NEVER apply \`will-change\` outside an active animation
- NEVER use \`useEffect\` for anything that can be expressed as render logic

## Design

- NEVER use gradients unless explicitly requested
- NEVER use purple or multicolor gradients
- NEVER use glow effects as primary affordances
- SHOULD use Tailwind CSS default shadow scale unless explicitly requested
- MUST give empty states one clear next action
- SHOULD limit accent color usage to one per view
- SHOULD use existing theme or Tailwind CSS color tokens before introducing new ones
`,
  },
]
