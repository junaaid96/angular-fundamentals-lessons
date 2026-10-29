// Generates website/content/ from the repo Markdown (single source of truth).
// Never edit website/content by hand: it is wiped and rebuilt on every build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.resolve(ROOT, 'website/content');
const GH = 'https://github.com/junaaid96/angular-fundamentals-lessons';

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const read = (p) => fs.readFileSync(p, 'utf8');

const pages = new Map();
const lessons = fs.readdirSync(path.join(ROOT, 'projects'))
  .filter((d) => /^\d\d-/.test(d) && fs.existsSync(path.join(ROOT, 'projects', d, 'README.md'))).sort();
for (const d of lessons) pages.set(`projects/${d}/README.md`, `lessons/${d}`);

function resolveLink(fromRel, href) {
  if (/^([a-z]+:|#|\/)/i.test(href)) return href;
  const [p, hash = ''] = href.split('#');
  const h = hash ? `#${hash}` : '';
  const target = path.posix.normalize(path.posix.join(path.posix.dirname(fromRel), p)).replace(/\/$/, '');
  for (const cand of [target, `${target}/README.md`]) if (pages.has(cand)) return `/${pages.get(cand)}${h}`;
  if (target === 'README.md' || target === '.') return `/${h}`;
  const abs = path.join(ROOT, target);
  const kind = fs.existsSync(abs) && fs.statSync(abs).isDirectory() ? 'tree' : 'blob';
  return `${GH}/${kind}/main/${target}${h}`;
}

// Outside code: rewrite relative links and stop Vue from reading Angular {{ }} in prose.
function rewrite(md, fromRel) {
  let inFence = false;
  return md.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return line; }
    if (inFence) return line;
    return line.split(/(`[^`]*`)/).map((seg, i) => (i % 2 ? seg : seg
      .replace(/\]\(([^)\s]+)\)/g, (_, h) => `](${resolveLink(fromRel, h)})`)
      .replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;'))).join('');
  }).join('\n');
}

const fm = (o) => `---\n${Object.entries(o).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n')}\n---\n\n`;
const firstHeading = (md) => (md.match(/^#\s+(.+)$/m) || [, ''])[1].trim();
const plain = (s) => s.replace(/[*_`]/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
const firstPara = (md) => {
  const para = md.split('\n\n').find((b) => b.trim() && !/^(#|\||```|!\[|-|>|\d+\.)/.test(b.trim()));
  return plain((para || '').replace(/\s+/g, ' ').trim()).slice(0, 180);
};

const LANG = { '.ts': 'ts', '.html': 'html', '.css': 'css', '.scss': 'scss' };
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return LANG[path.extname(e.name)] && !e.name.endsWith('.spec.ts') ? [p] : [];
  });
}
// app/ first (the lesson code), then the bootstrapping files.
function sourceSection(dir) {
  const src = path.join(ROOT, 'projects', dir, 'src');
  const files = walk(src).sort((a, b) => (rel(a).includes('/src/app/') ? 0 : 1) - (rel(b).includes('/src/app/') ? 0 : 1));
  if (!files.length) return '';
  let s = `\n\n## Source code\n\nThe lesson's TypeScript and HTML, embedded straight from the repo. Browse the folder on [GitHub](${GH}/tree/main/projects/${dir}).\n`;
  for (const f of files) {
    const r = rel(f);
    s += `\n::: details ${r.replace(`projects/${dir}/`, '')}\n[View on GitHub](${GH}/blob/main/${r})\n\n\`\`\`${LANG[path.extname(f)]}\n${read(f).replace(/\n$/, '')}\n\`\`\`\n:::\n`;
  }
  return s;
}

function emit(route, srcRel, body, extra = {}) {
  const file = path.join(OUT, `${route}.md`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, fm({ source: srcRel, ...extra }) + body + '\n');
}

// Sidebar labels come from the concept column of the root README learning path.
const concepts = Object.fromEntries([...read(path.join(ROOT, 'README.md')).matchAll(/^\|\s*(\d\d)\s*\|\s*\[[^\]]+\]\(projects\/[^)]+\)\s*\|\s*([^|]+?)\s*\|/gm)].map((m) => [m[1], m[2]]));
const side = { lessons: [] };
for (const [srcRel, route] of pages) {
  const md = read(path.join(ROOT, srcRel));
  const dir = srcRel.split('/')[1];
  const concept = concepts[dir.slice(0, 2)];
  const title = concept ? `${dir.slice(0, 2)} · ${concept}` : plain(firstHeading(md)) || dir;
  emit(route, srcRel, rewrite(md, srcRel) + sourceSection(dir), { title, description: firstPara(md) });
  side.lessons.push({ text: `${dir.slice(0, 2)}. ${concept ?? title}`, link: `/${route}` });
}

const readme = read(path.join(ROOT, 'README.md'));
const body = readme.split('\n').filter((l, i) => !(i === 0 && l.startsWith('# ')) && !/^\s*(\[!\[|!\[)/.test(l))
  .join('\n').replace(/^## Website[\s\S]*?(?=^## )/m, '');
const first = side.lessons[0]?.link ?? '/';
const home = fm({ layout: 'home', source: 'README.md', title: 'Angular Fundamentals Lessons', description: firstPara(body) })
  .replace(/---\n\n$/, `hero:
  name: "Angular Fundamentals"
  text: "${lessons.length} hands-on lessons in modern Angular 22"
  tagline: "Standalone components, signals, zoneless change detection, built-in control flow, routing, forms, DI and deferrable views. Each lesson is a runnable app with a concept guide."
  actions:
    - theme: brand
      text: Start lesson 00
      link: ${first}
    - theme: alt
      text: Signals
      link: /lessons/12-angular-signals
    - theme: alt
      text: View on GitHub
      link: ${GH}
features:
  - title: Components & templates
    details: Bootstrapping, templates, interpolation, property binding and component composition (00-03).
    link: /lessons/00-basic-app
  - title: Control flow & data flow
    details: "@if, @for and signal input() / output() between components (04-06)."
    link: /lessons/04-control-flow-if
  - title: Routing & forms
    details: Routes, params and links, then template-driven and reactive forms (07-10).
    link: /lessons/07-routing-basics
  - title: DI, signals & defer
    details: Dependency injection, signals and deferrable views (11-13).
    link: /lessons/11-dependency-injection
---

`);
fs.writeFileSync(path.join(OUT, 'index.md'), home + rewrite(body, 'README.md') + '\n');
fs.writeFileSync(path.resolve(ROOT, 'website/.vitepress/sidebar.generated.json'), JSON.stringify(side, null, 2));
console.log(`synced ${lessons.length} lessons`);
