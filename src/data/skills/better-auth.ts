import { Skill } from '../skill'

export const betterAuthSkills: Skill[] = [
  {
    name: 'create-auth',
    slug: 'better-auth-create-auth',
    category: 'agent-skills',
    author: {
      name: 'Better Auth',
      url: 'https://better-auth.com',
      avatar: 'https://better-auth.com/favicon/favicon.ico',
    },
    rawMarkdownUrl:
      'https://raw.githubusercontent.com/better-auth/skills/refs/heads/main/better-auth/create-auth/SKILL.md',
    githubUrl:
      'https://github.com/better-auth/skills/tree/main/better-auth/create-auth',
    content: `---
name: create-auth-skill
description: Skill for creating auth layers in TypeScript/JavaScript apps using Better Auth.
---

# Create Auth Skill

Guide for adding authentication to TypeScript/JavaScript applications using Better Auth.

**For code examples and syntax, see [better-auth.com/docs](https://better-auth.com/docs).**

---

## Decision Tree

\`\`\`
Is this a new/empty project?
├─ YES → New project setup
│   1. Identify framework
│   2. Choose database
│   3. Install better-auth
│   4. Create auth.ts + auth-client.ts
│   5. Set up route handler
│   6. Run CLI migrate/generate
│   7. Add features via plugins
│
└─ NO → Does project have existing auth?
    ├─ YES → Migration/enhancement
    │   • Audit current auth for gaps
    │   • Plan incremental migration
    │   • See migration guides in docs
    │
    └─ NO → Add auth to existing project
        1. Analyze project structure
        2. Install better-auth
        3. Create auth config
        4. Add route handler
        5. Run schema migrations
        6. Integrate into existing pages
\`\`\`

---

## Installation

**Core:** \`npm install better-auth\`

**Scoped packages (as needed):**
| Package | Use case |
|---------|----------|
| \`@better-auth/passkey\` | WebAuthn/Passkey auth |
| \`@better-auth/sso\` | SAML/OIDC enterprise SSO |
| \`@better-auth/stripe\` | Stripe payments |
| \`@better-auth/scim\` | SCIM user provisioning |
| \`@better-auth/expo\` | React Native/Expo |

---

## Environment Variables

\`\`\`env
BETTER_AUTH_SECRET=<32+ chars, generate with: openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=<your database connection string>
\`\`\`

Add OAuth secrets as needed: \`GITHUB_CLIENT_ID\`, \`GITHUB_CLIENT_SECRET\`, \`GOOGLE_CLIENT_ID\`, etc.

---

## Server Config (auth.ts)

**Location:** \`lib/auth.ts\` or \`src/lib/auth.ts\`

**Minimal config needs:**
- \`database\` - Connection or adapter
- \`emailAndPassword: { enabled: true }\` - For email/password auth

**Standard config adds:**
- \`socialProviders\` - OAuth providers (google, github, etc.)
- \`emailVerification.sendVerificationEmail\` - Email verification handler
- \`emailAndPassword.sendResetPassword\` - Password reset handler

**Full config adds:**
- \`plugins\` - Array of feature plugins
- \`session\` - Expiry, cookie cache settings
- \`account.accountLinking\` - Multi-provider linking
- \`rateLimit\` - Rate limiting config

**Export types:** \`export type Session = typeof auth.$Infer.Session\`

---

## Client Config (auth-client.ts)

**Import by framework:**
| Framework | Import |
|-----------|--------|
| React/Next.js | \`better-auth/react\` |
| Vue | \`better-auth/vue\` |
| Svelte | \`better-auth/svelte\` |
| Solid | \`better-auth/solid\` |
| Vanilla JS | \`better-auth/client\` |

**Client plugins** go in \`createAuthClient({ plugins: [...] })\`.

**Common exports:** \`signIn\`, \`signUp\`, \`signOut\`, \`useSession\`, \`getSession\`

---

## Route Handler Setup

| Framework | File | Handler |
|-----------|------|---------|
| Next.js App Router | \`app/api/auth/[...all]/route.ts\` | \`toNextJsHandler(auth)\` → export \`{ GET, POST }\` |
| Next.js Pages | \`pages/api/auth/[...all].ts\` | \`toNextJsHandler(auth)\` → default export |
| Express | Any file | \`app.all("/api/auth/*", toNodeHandler(auth))\` |
| SvelteKit | \`src/hooks.server.ts\` | \`svelteKitHandler(auth)\` |
| SolidStart | Route file | \`solidStartHandler(auth)\` |
| Hono | Route file | \`auth.handler(c.req.raw)\` |

**Next.js Server Components:** Add \`nextCookies()\` plugin to auth config.

---

## Database Migrations

| Adapter | Command |
|---------|---------|
| Built-in Kysely | \`npx @better-auth/cli@latest migrate\` (applies directly) |
| Prisma | \`npx @better-auth/cli@latest generate --output prisma/schema.prisma\` then \`npx prisma migrate dev\` |
| Drizzle | \`npx @better-auth/cli@latest generate --output src/db/auth-schema.ts\` then \`npx drizzle-kit push\` |

**Re-run after adding plugins.**

---

## Database Adapters

| Database | Setup |
|----------|-------|
| SQLite | Pass \`better-sqlite3\` or \`bun:sqlite\` instance directly |
| PostgreSQL | Pass \`pg.Pool\` instance directly |
| MySQL | Pass \`mysql2\` pool directly |
| Prisma | \`prismaAdapter(prisma, { provider: "postgresql" })\` from \`better-auth/adapters/prisma\` |
| Drizzle | \`drizzleAdapter(db, { provider: "pg" })\` from \`better-auth/adapters/drizzle\` |
| MongoDB | \`mongodbAdapter(db)\` from \`better-auth/adapters/mongodb\` |

---

## Common Plugins

| Plugin | Server Import | Client Import | Purpose |
|--------|---------------|---------------|---------|
| \`twoFactor\` | \`better-auth/plugins\` | \`twoFactorClient\` | 2FA with TOTP/OTP |
| \`organization\` | \`better-auth/plugins\` | \`organizationClient\` | Teams/orgs |
| \`admin\` | \`better-auth/plugins\` | \`adminClient\` | User management |
| \`bearer\` | \`better-auth/plugins\` | - | API token auth |
| \`openAPI\` | \`better-auth/plugins\` | - | API docs |
| \`passkey\` | \`@better-auth/passkey\` | \`passkeyClient\` | WebAuthn |
| \`sso\` | \`@better-auth/sso\` | - | Enterprise SSO |

**Plugin pattern:** Server plugin + client plugin + run migrations.

---

## Auth UI Implementation

**Sign in flow:**
1. \`signIn.email({ email, password })\` or \`signIn.social({ provider, callbackURL })\`
2. Handle \`error\` in response
3. Redirect on success

**Session check (client):** \`useSession()\` hook returns \`{ data: session, isPending }\`

**Session check (server):** \`auth.api.getSession({ headers: await headers() })\`

**Protected routes:** Check session, redirect to \`/sign-in\` if null.

---

## Security Checklist

- [ ] \`BETTER_AUTH_SECRET\` set (32+ chars)
- [ ] \`advanced.useSecureCookies: true\` in production
- [ ] \`trustedOrigins\` configured
- [ ] Rate limits enabled
- [ ] Email verification enabled
- [ ] Password reset implemented
- [ ] 2FA for sensitive apps
- [ ] CSRF protection NOT disabled
- [ ] \`account.accountLinking\` reviewed

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Secret not set" | Add \`BETTER_AUTH_SECRET\` env var |
| "Invalid Origin" | Add domain to \`trustedOrigins\` |
| Cookies not setting | Check \`baseURL\` matches domain; enable secure cookies in prod |
| OAuth callback errors | Verify redirect URIs in provider dashboard |
| Type errors after adding plugin | Re-run CLI generate/migrate |

---

## Resources

- [Docs](https://better-auth.com/docs)
- [Examples](https://github.com/better-auth/examples)
- [Plugins](https://better-auth.com/docs/concepts/plugins)
- [CLI](https://better-auth.com/docs/concepts/cli)
- [Migration Guides](https://better-auth.com/docs/guides)`,
  },

  {
    name: 'better-auth-best-practices',
    slug: 'better-auth-best-practices',
    category: 'agent-skills',
    author: {
      name: 'Better Auth',
      url: 'https://better-auth.com',
      avatar: 'https://better-auth.com/favicon/favicon.ico',
    },
    rawMarkdownUrl:
      'https://raw.githubusercontent.com/better-auth/skills/refs/heads/main/better-auth/best-practices/SKILL.md',
    githubUrl:
      'https://github.com/better-auth/skills/tree/main/better-auth/best-practices',
    content: `---
name: better-auth-best-practices
description: Skill for integrating Better Auth - the comprehensive TypeScript authentication framework.
---

# Better Auth Integration Guide

**Always consult [better-auth.com/docs](https://better-auth.com/docs) for code examples and latest API.**

Better Auth is a TypeScript-first, framework-agnostic auth framework supporting email/password, OAuth, magic links, passkeys, and more via plugins.

---

## Quick Reference

### Environment Variables
- \`BETTER_AUTH_SECRET\` - Encryption secret (min 32 chars). Generate: \`openssl rand -base64 32\`
- \`BETTER_AUTH_URL\` - Base URL (e.g., \`https://example.com\`)

Only define \`baseURL\`/\`secret\` in config if env vars are NOT set.

### File Location
CLI looks for \`auth.ts\` in: \`./\`, \`./lib\`, \`./utils\`, or under \`./src\`. Use \`--config\` for custom path.

### CLI Commands
- \`npx @better-auth/cli@latest migrate\` - Apply schema (built-in adapter)
- \`npx @better-auth/cli@latest generate\` - Generate schema for Prisma/Drizzle
- \`npx @better-auth/cli mcp --cursor\` - Add MCP to AI tools

**Re-run after adding/changing plugins.**

---

## Core Config Options

| Option | Notes |
|--------|-------|
| \`appName\` | Optional display name |
| \`baseURL\` | Only if \`BETTER_AUTH_URL\` not set |
| \`basePath\` | Default \`/api/auth\`. Set \`/\` for root. |
| \`secret\` | Only if \`BETTER_AUTH_SECRET\` not set |
| \`database\` | Required for most features. See adapters docs. |
| \`secondaryStorage\` | Redis/KV for sessions & rate limits |
| \`emailAndPassword\` | \`{ enabled: true }\` to activate |
| \`socialProviders\` | \`{ google: { clientId, clientSecret }, ... }\` |
| \`plugins\` | Array of plugins |
| \`trustedOrigins\` | CSRF whitelist |

---

## Database

**Direct connections:** Pass \`pg.Pool\`, \`mysql2\` pool, \`better-sqlite3\`, or \`bun:sqlite\` instance.

**ORM adapters:** Import from \`better-auth/adapters/drizzle\`, \`better-auth/adapters/prisma\`, \`better-auth/adapters/mongodb\`.

**Critical:** Better Auth uses adapter model names, NOT underlying table names. If Prisma model is \`User\` mapping to table \`users\`, use \`modelName: "user"\` (Prisma reference), not \`"users"\`.

---

## Session Management

**Storage priority:**
1. If \`secondaryStorage\` defined → sessions go there (not DB)
2. Set \`session.storeSessionInDatabase: true\` to also persist to DB
3. No database + \`cookieCache\` → fully stateless mode

**Cookie cache strategies:**
- \`compact\` (default) - Base64url + HMAC. Smallest.
- \`jwt\` - Standard JWT. Readable but signed.
- \`jwe\` - Encrypted. Maximum security.

**Key options:** \`session.expiresIn\` (default 7 days), \`session.updateAge\` (refresh interval), \`session.cookieCache.maxAge\`, \`session.cookieCache.version\` (change to invalidate all sessions).

---

## User & Account Config

**User:** \`user.modelName\`, \`user.fields\` (column mapping), \`user.additionalFields\`, \`user.changeEmail.enabled\` (disabled by default), \`user.deleteUser.enabled\` (disabled by default).

**Account:** \`account.modelName\`, \`account.accountLinking.enabled\`, \`account.storeAccountCookie\` (for stateless OAuth).

**Required for registration:** \`email\` and \`name\` fields.

---

## Email Flows

- \`emailVerification.sendVerificationEmail\` - Must be defined for verification to work
- \`emailVerification.sendOnSignUp\` / \`sendOnSignIn\` - Auto-send triggers
- \`emailAndPassword.sendResetPassword\` - Password reset email handler

---

## Security

**In \`advanced\`:**
- \`useSecureCookies\` - Force HTTPS cookies
- \`disableCSRFCheck\` - ⚠️ Security risk
- \`disableOriginCheck\` - ⚠️ Security risk  
- \`crossSubDomainCookies.enabled\` - Share cookies across subdomains
- \`ipAddress.ipAddressHeaders\` - Custom IP headers for proxies
- \`database.generateId\` - Custom ID generation or \`"serial"\`/\`"uuid"\`/\`false\`

**Rate limiting:** \`rateLimit.enabled\`, \`rateLimit.window\`, \`rateLimit.max\`, \`rateLimit.storage\` (\`"memory"\` | \`"database"\` | \`"secondary-storage"\`).

---

## Hooks

**Endpoint hooks:** \`hooks.before\` / \`hooks.after\` - Array of \`{ matcher, handler }\`. Use \`createAuthMiddleware\`. Access \`ctx.path\`, \`ctx.context.returned\` (after), \`ctx.context.session\`.

**Database hooks:** \`databaseHooks.user.create.before/after\`, same for \`session\`, \`account\`. Useful for adding default values or post-creation actions.

**Hook context (\`ctx.context\`):** \`session\`, \`secret\`, \`authCookies\`, \`password.hash()\`/\`verify()\`, \`adapter\`, \`internalAdapter\`, \`generateId()\`, \`tables\`, \`baseURL\`.

---

## Plugins

**Import from dedicated paths for tree-shaking:**
\`\`\`
import { twoFactor } from "better-auth/plugins/two-factor"
\`\`\`
NOT \`from "better-auth/plugins"\`.

**Popular plugins:** \`twoFactor\`, \`organization\`, \`passkey\`, \`magicLink\`, \`emailOtp\`, \`username\`, \`phoneNumber\`, \`admin\`, \`apiKey\`, \`bearer\`, \`jwt\`, \`multiSession\`, \`sso\`, \`oauthProvider\`, \`oidcProvider\`, \`openAPI\`, \`genericOAuth\`.

Client plugins go in \`createAuthClient({ plugins: [...] })\`.

---

## Client

Import from: \`better-auth/client\` (vanilla), \`better-auth/react\`, \`better-auth/vue\`, \`better-auth/svelte\`, \`better-auth/solid\`.

Key methods: \`signUp.email()\`, \`signIn.email()\`, \`signIn.social()\`, \`signOut()\`, \`useSession()\`, \`getSession()\`, \`revokeSession()\`, \`revokeSessions()\`.

---

## Type Safety

Infer types: \`typeof auth.$Infer.Session\`, \`typeof auth.$Infer.Session.user\`.

For separate client/server projects: \`createAuthClient<typeof auth>()\`.

---

## Common Gotchas

1. **Model vs table name** - Config uses ORM model name, not DB table name
2. **Plugin schema** - Re-run CLI after adding plugins
3. **Secondary storage** - Sessions go there by default, not DB
4. **Cookie cache** - Custom session fields NOT cached, always re-fetched
5. **Stateless mode** - No DB = session in cookie only, logout on cache expiry
6. **Change email flow** - Sends to current email first, then new email

---

## Resources

- [Docs](https://better-auth.com/docs)
- [Options Reference](https://better-auth.com/docs/reference/options)
- [LLMs.txt](https://better-auth.com/llms.txt)
- [GitHub](https://github.com/better-auth/better-auth)
- [Init Options Source](https://github.com/better-auth/better-auth/blob/main/packages/core/src/types/init-options.ts)`,
  },
]
