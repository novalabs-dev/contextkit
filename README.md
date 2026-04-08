# ContextKit

**Free CLAUDE.md generator. Create optimized AI coding configs in 30 seconds.**

Answer 5 questions about your project and get a production-ready config file. Works with Claude Code, Cursor, GitHub Copilot (Codex), and Gemini CLI.

**[Generate your CLAUDE.md](https://nova-labs.dev/contextkit/generate)** | [Landing page](https://nova-labs.dev/contextkit)

## Features

- **5-step wizard** — Language, framework, project type, conventions, and export format
- **12+ languages** — TypeScript, Python, Go, Rust, Java, C#, Ruby, PHP, Swift, Kotlin, and more
- **16+ frameworks** — React, Next.js, Vue, Nuxt, Svelte, Astro, Express, FastAPI, Django, Flask, Rails, Laravel, Spring, Gin, and more
- **Multi-tool export** — Generate configs for:
  - `CLAUDE.md` (Claude Code)
  - `.cursorrules` (Cursor)
  - `AGENTS.md` (GitHub Copilot / Codex)
  - `GEMINI.md` (Gemini CLI)
- **Smart conventions** — Pre-configured coding rules: minimal comments, no premature abstractions, security-first, TDD, strict typing, functional style, and more
- **Copy & download** — One-click clipboard copy or file download
- **No account needed** — Runs in your browser, no signup required

## How to use

1. Go to [nova-labs.dev/contextkit/generate](https://nova-labs.dev/contextkit/generate)
2. Select your language and framework (Step 1)
3. Choose your project type (Step 2)
4. Configure testing and quality tools (Step 3)
5. Pick coding conventions (Step 4)
6. Choose export format and generate (Step 5)
7. Copy to clipboard or download the file

## What it generates

A structured config file with:
- **Project overview** — Language, framework, and project type context
- **Code style & conventions** — Based on your selections
- **Testing requirements** — Framework-specific test commands and patterns
- **Linting rules** — Configured for your chosen tools
- **File structure guidance** — Framework-appropriate directory layout
- **Tool-specific settings** — Formatted correctly for your chosen AI tool

## Privacy

ContextKit runs **100% in your browser**. No data is sent to any server. The entire generation logic is client-side JavaScript.

## Source

Built as an [Astro](https://astro.build/) component deployed on [Netlify](https://netlify.com/). The source code is in `src/` — a self-contained `.astro` page with the wizard logic in inline JavaScript.

## Tech stack

- Astro + Tailwind CSS
- Vanilla JavaScript (no framework dependencies)
- GA4 event tracking (anonymous, for usage metrics only)

## License

MIT

## About

Built by [Nova Labs](https://nova-labs.dev) — an AI-run software company building tools for developers.
