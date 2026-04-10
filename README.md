<div align="center">

# ContextKit

**Score, generate, and manage AI coding configs.**

CLI + web tools for Claude Code, Cursor, GitHub Copilot, and Gemini CLI. Score your CLAUDE.md from the terminal or generate production-ready configs in seconds.

[**Try the CLI**](#cli) · [**Web Generator**](https://nova-labs.dev/contextkit/generate) · [**Web Analyzer**](https://nova-labs.dev/contextkit/analyze) · [Website](https://nova-labs.dev/contextkit)

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/contextkit)](https://www.npmjs.com/package/contextkit)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fnova-labs.dev%2Fcontextkit%2Fgenerate&label=generator)](https://nova-labs.dev/contextkit/generate)

</div>

---

## CLI

Score your CLAUDE.md from the terminal. Zero dependencies, instant results.

```bash
npx contextkit score
```

```
─────────────────────────────────────────
  CLAUDE.md Score  8/10 (Good)
  ./CLAUDE.md
─────────────────────────────────────────

  Solid config with room for improvement.

  Categories

  Structure      ████████████████ 2/2
  Architecture   ████████████████ 2/2
  Conventions    ████████████████ 2/2
  Testing        ████████████     1.5/2
  Guardrails     ████████         1/2

  Improvements

  ! Add security rules (XSS, injection, etc.)

  ✓ Good structure with clear sections
  ✓ Tech stack and file structure documented
  ✓ Clear conventions with specific rules
  ✓ Testing framework and commands documented
─────────────────────────────────────────
```

### Usage

```bash
# Score CLAUDE.md in current directory (auto-detects config files)
npx contextkit score

# Score a specific file
npx contextkit score path/to/CLAUDE.md

# Score a Cursor config
npx contextkit score .cursorrules

# Pipe content from stdin
cat CLAUDE.md | npx contextkit score --stdin
```

**Auto-detection:** If no file is specified, the CLI looks for `CLAUDE.md`, `.claude/CLAUDE.md`, `.cursorrules`, `.cursor/rules`, `AGENTS.md`, `codex.md`, or `GEMINI.md` in the current directory.

**Exit codes:** Returns `0` for scores >= 5/10, `1` for lower scores. Use in CI to enforce config quality.

### CI example

```yaml
# .github/workflows/lint-config.yml
name: Lint AI Config
on: [pull_request]
jobs:
  score:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx contextkit score
```

## The problem

Every Claude Code project needs a `CLAUDE.md`. Every Cursor project needs `.cursorrules`. Gemini CLI needs `GEMINI.md`. GitHub Copilot needs `AGENTS.md`.

Writing these from scratch means:
- Guessing the right structure (there's no standard)
- Missing conventions your AI tool actually supports
- Copy-pasting from old projects and hoping it still works
- Spending 20 minutes on something that should take 30 seconds

And even if you already have a config file — how do you know if it's actually good?

ContextKit solves both: **score** existing configs from the terminal or web, or **generate** new ones automatically.

## Web tools

### Generator

| Feature | Description |
|---------|-------------|
| **5-step wizard** | Language, Framework, Project type, Conventions, Export |
| **12+ languages** | TypeScript, Python, Go, Rust, Java, C#, Ruby, PHP, Swift, Kotlin |
| **16+ frameworks** | React, Next.js, Vue, Nuxt, Svelte, Astro, Express, FastAPI, Django, Flask, Rails, Laravel, Spring, Gin |
| **4 export formats** | `CLAUDE.md`, `.cursorrules`, `AGENTS.md`, `GEMINI.md` |
| **Shareable configs** | URL-encoded state — share your exact configuration |
| **No account needed** | Runs in your browser, nothing uploaded |

### Analyzer

| Feature | Description |
|---------|-------------|
| **Score out of 10** | 5 categories: Structure, Architecture, Conventions, Testing, Guardrails |
| **Actionable feedback** | Specific suggestions for each weak category |
| **README badges** | Show your CLAUDE.md score in your repo |
| **Shareable scores** | "My CLAUDE.md scored 8/10" — one-click share |

## Quick start

### From the terminal

```bash
# Install globally (optional)
npm install -g contextkit

# Or run directly
npx contextkit score
```

### From the web

1. [Generate a config](https://nova-labs.dev/contextkit/generate) — 5-step wizard, 30 seconds
2. [Score your config](https://nova-labs.dev/contextkit/analyze) — paste and get a score

## Scoring categories

| Category | What it checks | Max |
|----------|---------------|-----|
| **Structure** | Headings, sections, markdown formatting, length | 2 |
| **Architecture** | Tech stack, project type, file structure, overview | 2 |
| **Conventions** | Coding rules, do's and don'ts, naming, imports | 2 |
| **Testing** | Test framework, commands, strategy, file locations | 2 |
| **Guardrails** | Security rules, scope limits, read-first policy | 2 |

## Privacy

**Zero data collection.** The CLI reads files locally. The web tools run as client-side JavaScript. Nothing is sent to any server.

## Contributing

Issues and PRs welcome. Especially helpful:
- New language/framework templates
- Convention suggestions
- Analyzer category refinements
- CI integration examples

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">
Built by <a href="https://nova-labs.dev">Nova Labs</a> — developer tools for AI-assisted coding.
</div>
