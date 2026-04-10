#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { scoreClaudeMd } = require('../lib/score');

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';

function printUsage() {
  console.log(`
${BOLD}contextkit${RESET} — Score your AI coding config

${BOLD}Usage:${RESET}
  contextkit score [file]     Score a CLAUDE.md file (default: ./CLAUDE.md)
  contextkit score --stdin    Read from stdin
  contextkit help             Show this help message

${BOLD}Examples:${RESET}
  contextkit score                          Score ./CLAUDE.md
  contextkit score path/to/CLAUDE.md        Score a specific file
  contextkit score .cursorrules             Score a Cursor config
  cat CLAUDE.md | contextkit score --stdin  Pipe content in

${BOLD}Scoring categories:${RESET}
  Structure      Headings, sections, markdown formatting
  Architecture   Tech stack, project type, file structure
  Conventions    Coding rules, style, do's and don'ts
  Testing        Test framework, commands, strategy
  Guardrails     Security, scope limits, read-first policy

${DIM}Web tools: https://nova-labs.dev/contextkit${RESET}
${DIM}Generator: https://nova-labs.dev/contextkit/generate${RESET}
${DIM}Analyzer:  https://nova-labs.dev/contextkit/analyze${RESET}
`);
}

function scoreColor(score, max) {
  const pct = score / max;
  if (pct >= 0.75) return GREEN;
  if (pct >= 0.5) return YELLOW;
  return RED;
}

function scoreBar(score, max, width = 20) {
  const filled = Math.round((score / max) * width);
  const empty = width - filled;
  const color = scoreColor(score, max);
  return `${color}${'█'.repeat(filled)}${DIM}${'░'.repeat(empty)}${RESET}`;
}

function suggestionIcon(type) {
  if (type === 'pass') return `${GREEN}✓${RESET}`;
  if (type === 'critical') return `${RED}✗${RESET}`;
  return `${YELLOW}!${RESET}`;
}

function printResults(result, filePath) {
  const { score, label, summary, categories, suggestions } = result;

  // Header
  const totalColor = scoreColor(score, 10);
  console.log('');
  console.log(`${DIM}─────────────────────────────────────────${RESET}`);
  console.log(`${BOLD}  CLAUDE.md Score${RESET}  ${totalColor}${BOLD}${score}/10${RESET} ${DIM}(${label})${RESET}`);
  if (filePath) console.log(`${DIM}  ${filePath}${RESET}`);
  console.log(`${DIM}─────────────────────────────────────────${RESET}`);
  console.log('');

  // Summary
  console.log(`  ${summary}`);
  console.log('');

  // Categories
  console.log(`${BOLD}  Categories${RESET}`);
  console.log('');
  for (const cat of categories) {
    const color = scoreColor(cat.score, cat.max);
    const bar = scoreBar(cat.score, cat.max, 16);
    const scoreText = `${color}${cat.score}/${cat.max}${RESET}`;
    console.log(`  ${cat.name.padEnd(14)} ${bar} ${scoreText}`);
  }
  console.log('');

  // Suggestions
  const failures = suggestions.filter(s => s.type !== 'pass');
  const passes = suggestions.filter(s => s.type === 'pass');

  if (failures.length > 0) {
    console.log(`${BOLD}  Improvements${RESET}`);
    console.log('');
    for (const s of failures) {
      const icon = suggestionIcon(s.type);
      // Word wrap at ~70 chars
      const words = s.text.split(' ');
      let line = '';
      let first = true;
      for (const word of words) {
        if (line.length + word.length + 1 > 68) {
          if (first) {
            console.log(`  ${icon} ${line}`);
            first = false;
          } else {
            console.log(`    ${line}`);
          }
          line = word;
        } else {
          line = line ? `${line} ${word}` : word;
        }
      }
      if (line) {
        if (first) console.log(`  ${icon} ${line}`);
        else console.log(`    ${line}`);
      }
    }
    console.log('');
  }

  if (passes.length > 0) {
    for (const s of passes) {
      console.log(`  ${suggestionIcon('pass')} ${s.text}`);
    }
    console.log('');
  }

  // CTA
  console.log(`${DIM}─────────────────────────────────────────${RESET}`);
  if (score < 7) {
    console.log(`  ${CYAN}Generate an optimized config:${RESET}`);
    console.log(`  ${DIM}https://nova-labs.dev/contextkit/generate${RESET}`);
  } else {
    console.log(`  ${GREEN}Strong config.${RESET} Share your score:`);
    console.log(`  ${DIM}https://nova-labs.dev/contextkit/analyze${RESET}`);
  }
  console.log(`${DIM}─────────────────────────────────────────${RESET}`);
  console.log('');
}

// --- Main ---

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printUsage();
  process.exit(0);
}

if (command === 'score') {
  const target = args[1];

  if (target === '--stdin') {
    // Read from stdin
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => { data += chunk; });
    process.stdin.on('end', () => {
      if (!data.trim()) {
        console.error(`${RED}Error: No input received from stdin${RESET}`);
        process.exit(1);
      }
      const result = scoreClaudeMd(data);
      printResults(result, '(stdin)');
      process.exit(result.score >= 5 ? 0 : 1);
    });
  } else {
    // Read from file
    const filePath = target || findConfigFile();
    if (!filePath) {
      console.error(`${RED}Error: No CLAUDE.md found in current directory${RESET}`);
      console.error(`${DIM}Try: contextkit score path/to/CLAUDE.md${RESET}`);
      console.error(`${DIM}Or:  contextkit score --stdin < file.md${RESET}`);
      process.exit(1);
    }

    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`${RED}Error: Cannot read ${filePath}${RESET}`);
      console.error(`${DIM}${err.message}${RESET}`);
      process.exit(1);
    }

    const result = scoreClaudeMd(content);
    printResults(result, filePath);
    process.exit(result.score >= 5 ? 0 : 1);
  }
} else {
  console.error(`${RED}Unknown command: ${command}${RESET}`);
  console.error(`${DIM}Run 'contextkit help' for usage${RESET}`);
  process.exit(1);
}

function findConfigFile() {
  const candidates = [
    'CLAUDE.md',
    '.claude/CLAUDE.md',
    '.cursorrules',
    '.cursor/rules',
    'AGENTS.md',
    'codex.md',
    'GEMINI.md',
  ];
  for (const name of candidates) {
    const full = path.resolve(process.cwd(), name);
    if (fs.existsSync(full)) return full;
  }
  return null;
}
