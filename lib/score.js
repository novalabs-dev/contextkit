/**
 * ContextKit CLAUDE.md scoring engine.
 * Scores AI coding config files across 5 categories (0-10 total).
 *
 * Same logic as https://nova-labs.dev/contextkit/analyze
 */

function scoreClaudeMd(content) {
  const lower = content.toLowerCase();
  const lines = content.split('\n');
  const headings = lines.filter(l => l.match(/^#{1,3}\s/));
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;

  const categories = [];
  const suggestions = [];

  // Detect non-config content
  const configSignals = /(claude|cursor|codex|gemini|convention|style|rule|project|architecture|testing|code|import|function|class|module)/i;
  const hasMarkdown = headings.length > 0 || content.includes('- ') || content.includes('```');
  if (!configSignals.test(content) && !hasMarkdown && wordCount > 20) {
    suggestions.push({
      type: 'critical',
      text: 'This doesn\'t look like a CLAUDE.md or coding config file. Paste your project\'s CLAUDE.md, .cursorrules, or AGENTS.md for an accurate score.'
    });
  }

  // 1. STRUCTURE (0-2)
  let structureScore = 0;
  const hasHeadings = headings.length >= 2;
  const hasMultipleSections = headings.length >= 4;
  const hasReasonableLength = wordCount >= 50;
  const hasMdFormatting = content.includes('```') || content.includes('- ') || content.includes('* ');

  if (hasHeadings) structureScore += 0.5;
  if (hasMultipleSections) structureScore += 0.5;
  if (hasReasonableLength) structureScore += 0.5;
  if (hasMdFormatting) structureScore += 0.5;
  structureScore = Math.min(2, structureScore);

  if (!hasHeadings) suggestions.push({ type: 'critical', text: 'Add markdown headings (## Section Name) to organize your config. AI tools parse sections to find relevant instructions.' });
  else if (!hasMultipleSections) suggestions.push({ type: 'fail', text: 'Add more sections. Good configs have 4+ sections covering architecture, conventions, testing, and guardrails.' });
  if (!hasReasonableLength) suggestions.push({ type: 'fail', text: 'Your config is very short. Aim for at least 50 words — the AI needs enough context to be useful.' });
  if (hasHeadings && hasMultipleSections && hasReasonableLength) suggestions.push({ type: 'pass', text: 'Good structure with clear sections and enough detail.' });

  categories.push({ name: 'Structure', score: structureScore, max: 2, desc: 'Headings, sections, and markdown formatting' });

  // 2. ARCHITECTURE (0-2)
  let archScore = 0;
  const hasTechStack = /(typescript|javascript|python|go|rust|java|react|next\.?js|vue|svelte|astro|django|fastapi|flask|express|rails|laravel|spring)/i.test(content);
  const hasProjectType = /(web app|api|cli|library|backend|frontend|mobile|monorepo|service)/i.test(content);
  const hasFileStructure = /```[\s\S]*?(src\/|app\/|lib\/|pages\/|components\/|routes\/)[\s\S]*?```/i.test(content) || /(file structure|directory|folder)/i.test(content);
  const hasArchDescription = /(architecture|overview|project|built with|stack)/i.test(content);

  if (hasTechStack) archScore += 0.5;
  if (hasProjectType) archScore += 0.5;
  if (hasFileStructure) archScore += 0.5;
  if (hasArchDescription) archScore += 0.5;
  archScore = Math.min(2, archScore);

  if (!hasTechStack) suggestions.push({ type: 'fail', text: 'Mention your tech stack (language + framework). This helps the AI write idiomatic code instead of guessing.' });
  if (!hasFileStructure) suggestions.push({ type: 'fail', text: 'Add a file structure section with a directory tree. This prevents the AI from creating files in wrong locations.' });
  if (hasTechStack && hasFileStructure) suggestions.push({ type: 'pass', text: 'Tech stack and file structure are documented.' });

  categories.push({ name: 'Architecture', score: archScore, max: 2, desc: 'Tech stack, project type, file structure' });

  // 3. CONVENTIONS (0-2)
  let convScore = 0;
  const hasConventions = /(convention|style|rule|prefer|avoid|always|never|do not|don\'t)/i.test(content);
  const hasSpecificRules = (content.match(/^[-*]\s/gm) || []).length >= 3;
  const hasNamingConventions = /(naming|camelCase|snake_case|PascalCase|kebab-case)/i.test(content);
  const hasImportRules = /(import|export|require|module)/i.test(content);
  const hasDoNots = /(do not|don\'t|never|avoid|no\s)/i.test(content);

  if (hasConventions) convScore += 0.5;
  if (hasSpecificRules) convScore += 0.5;
  if (hasDoNots) convScore += 0.5;
  if (hasNamingConventions || hasImportRules) convScore += 0.5;
  convScore = Math.min(2, convScore);

  if (!hasConventions) suggestions.push({ type: 'critical', text: 'Add coding conventions. Without rules, the AI uses generic defaults. Tell it what style you expect.' });
  if (!hasDoNots) suggestions.push({ type: 'fail', text: 'Add "do not" rules. AI tools respond well to explicit prohibitions (e.g., "Do not add docstrings to obvious functions").' });
  if (hasConventions && hasSpecificRules && hasDoNots) suggestions.push({ type: 'pass', text: 'Clear conventions with specific rules and prohibitions.' });

  categories.push({ name: 'Conventions', score: convScore, max: 2, desc: 'Coding rules, style, do\'s and don\'ts' });

  // 4. TESTING (0-2)
  let testScore = 0;
  const hasTestFramework = /(jest|vitest|pytest|go test|rspec|junit|phpunit|playwright|cypress|mocha|testing)/i.test(content);
  const hasTestCommand = /(npm test|npx |pytest|go test|bundle exec|mvn test|run test)/i.test(content);
  const hasTestStrategy = /(unit test|integration test|e2e|end.to.end|test coverage|test file)/i.test(content);
  const hasTestLocation = /(\.test\.|\.spec\.|__tests__|tests\/|test\/)/i.test(content);

  if (hasTestFramework) testScore += 0.5;
  if (hasTestCommand) testScore += 0.5;
  if (hasTestStrategy) testScore += 0.5;
  if (hasTestLocation) testScore += 0.5;
  testScore = Math.min(2, testScore);

  if (!hasTestFramework && !hasTestCommand) suggestions.push({ type: 'fail', text: 'Add testing instructions. Specify your test framework and how to run tests so the AI writes testable code.' });
  if (hasTestFramework && !hasTestCommand) suggestions.push({ type: 'fail', text: 'Add the command to run tests (e.g., "npx vitest" or "pytest"). The AI needs to know how to verify its work.' });
  if (hasTestFramework && hasTestCommand) suggestions.push({ type: 'pass', text: 'Testing framework and commands are documented.' });

  categories.push({ name: 'Testing', score: testScore, max: 2, desc: 'Test framework, commands, strategy' });

  // 5. GUARDRAILS (0-2)
  let guardScore = 0;
  const hasSecurity = /(security|xss|injection|sanitize|validate|csrf|auth)/i.test(content);
  const hasErrorHandling = /(error handling|try.catch|exception|error boundary|fallback)/i.test(content);
  const hasMinimalism = /(minimal|don\'t add|do not add|keep changes|focused|no extra|no unnecessary)/i.test(content);
  const hasReadFirst = /(read existing|read.*before|understand.*before|existing code)/i.test(content);
  const hasDependencies = /(dependencies|package|npm install|pip install|go get|cargo add)/i.test(content);

  if (hasSecurity) guardScore += 0.5;
  if (hasErrorHandling) guardScore += 0.5;
  if (hasMinimalism) guardScore += 0.5;
  if (hasReadFirst || hasDependencies) guardScore += 0.5;
  guardScore = Math.min(2, guardScore);

  if (!hasSecurity) suggestions.push({ type: 'fail', text: 'Add security rules. Mention common vulnerabilities to avoid (XSS, injection, etc.) — the AI will actively check for them.' });
  if (!hasMinimalism) suggestions.push({ type: 'fail', text: 'Add scope constraints like "Keep changes minimal and focused" or "Do not add features beyond what was asked."' });
  if (!hasReadFirst) suggestions.push({ type: 'fail', text: 'Add "Read existing code before suggesting modifications" — this single rule prevents most bad suggestions.' });
  if (hasSecurity && hasMinimalism && hasReadFirst) suggestions.push({ type: 'pass', text: 'Strong guardrails with security rules, scope constraints, and read-first policy.' });

  categories.push({ name: 'Guardrails', score: guardScore, max: 2, desc: 'Security, scope limits, read-first policy' });

  // Total score
  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  const roundedScore = Math.round(totalScore * 10) / 10;

  // Score label
  let label, summary;
  if (roundedScore >= 9) { label = 'Excellent'; summary = 'Your config covers all the critical areas. The AI has clear instructions for your project.'; }
  else if (roundedScore >= 7) { label = 'Good'; summary = 'Solid config with room for improvement. A few additions would make the AI significantly more effective.'; }
  else if (roundedScore >= 5) { label = 'Decent'; summary = 'Your config covers the basics but is missing important sections. The AI is probably guessing in some areas.'; }
  else if (roundedScore >= 3) { label = 'Needs work'; summary = 'Several critical areas are missing. The AI is working with limited context about your project.'; }
  else { label = 'Minimal'; summary = 'Your config needs significant expansion. Right now the AI has almost no project-specific guidance.'; }

  // Sort: critical first, then fail, then pass
  const order = { critical: 0, fail: 1, pass: 2 };
  suggestions.sort((a, b) => order[a.type] - order[b.type]);

  return { score: roundedScore, label, summary, categories, suggestions };
}

module.exports = { scoreClaudeMd };
