// Runs `ng build <lesson>` or `ng test <lesson>` for every lesson in projects/.
// Usage: npm run build:all | npm run test:all
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const target = process.argv[2] ?? 'build';
const extra = target === 'test' ? ['--watch=false'] : [];
const failed = [];
for (const lesson of readdirSync('projects').sort()) {
  console.log(`\n=== ng ${target} ${lesson}`);
  const r = spawnSync('npx', ['ng', target, lesson, ...extra], { stdio: 'inherit' });
  if (r.status !== 0) failed.push(lesson);
}
if (failed.length) {
  console.error(`\nFailed: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`\nAll lessons passed ng ${target}.`);
