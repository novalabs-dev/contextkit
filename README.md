<div align="center">

# ContextKit

**Generate the perfect CLAUDE.md for any project in 30 seconds.**

Free config generator for Claude Code, Cursor, GitHub Copilot, and Gemini CLI. Answer 5 questions, get a production-ready config file.

[**Generate your config**](https://nova-labs.dev/contextkit/generate) · [Website](https://nova-labs.dev/contextkit) · [Blog](https://nova-labs.dev/blog)

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fnova-labs.dev%2Fcontextkit%2Fgenerate&label=generator)](https://nova-labs.dev/contextkit/generate)

</div>

---

## The problem

Every Claude Code project needs a `CLAUDE.md`. Every Cursor project needs `.cursorrules`. Gemini CLI needs `GEMINI.md`. GitHub Copilot needs `AGENTS.md`.

Writing these from scratch means:
- Guessing the right structure (there's no standard)
- Missing conventions your AI tool actually supports
- Copy-pasting from old projects and hoping it still works
- Spending 20 minutes on something that should take 30 seconds

ContextKit generates these files automatically, tailored to your exact stack.

## Features

| Feature | Description |
|---------|-------------|
| **5-step wizard** | Language → Framework → Project type → Conventions → Export |
| **12+ languages** | TypeScript, Python, Go, Rust, Java, C#, Ruby, PHP, Swift, Kotlin, and more |
| **16+ frameworks** | React, Next.js, Vue, Nuxt, Svelte, Astro, Express, FastAPI, Django, Flask, Rails, Laravel, Spring, Gin |
| **4 export formats** | `CLAUDE.md`, `.cursorrules`, `AGENTS.md`, `GEMINI.md` |
| **Smart conventions** | Minimal comments, no premature abstractions, security-first, TDD, strict typing, functional style |
| **Shareable configs** | Generate a URL that loads your exact configuration for teammates |
| **Copy & download** | One-click clipboard copy or file download |
| **No account needed** | Runs in your browser, no signup |

## Quick start

1. Open [nova-labs.dev/contextkit/generate](https://nova-labs.dev/contextkit/generate)
2. Pick your language and framework
3. Choose project type, testing, and conventions
4. Select export format (CLAUDE.md, .cursorrules, AGENTS.md, or GEMINI.md)
5. Copy to clipboard or download

## What it generates

A structured config file with:
- **Project context** — Language, framework, and project type
- **Code style** — Conventions based on your selections
- **Testing rules** — Framework-specific test commands and patterns
- **Linting config** — Configured for your chosen tools
- **File structure** — Framework-appropriate directory layout
- **Tool-specific formatting** — Correct syntax for your AI coding tool

### Example output (React + TypeScript)

```markdown
# Project Configuration

## Overview
- Language: TypeScript
- Framework: React (Vite)
- Type: Web Application

## Code Style
- Use functional components with hooks
- Prefer named exports
- Use TypeScript strict mode
...
```

## Shareable configs

Generate a config and click **Share** to get a URL like:

```
nova-labs.dev/contextkit/generate?lang=typescript&framework=react&type=webapp&...
```

Send it to a teammate — they'll see your exact configuration pre-filled, ready to generate.

## Privacy

**Zero data collection.** ContextKit has no backend. The entire wizard runs as client-side JavaScript. Nothing is sent to any server.

## Tech stack

- [Astro](https://astro.build/) + Tailwind CSS
- Vanilla JavaScript (inline, no build dependencies)
- Deployed on [Netlify](https://netlify.com/) (free tier)

## Contributing

Issues and PRs welcome. Especially helpful:
- New language/framework templates
- Convention suggestions
- Export format improvements

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">
Built by <a href="https://nova-labs.dev">Nova Labs</a> — an AI-run company building developer tools.
</div>
