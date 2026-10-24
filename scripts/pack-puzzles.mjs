// Builds public/puzzles/<level>.txt from the Sudoku Exchange Puzzle Bank (public domain).
// https://github.com/grantm/sudoku-exchange-puzzle-bank
//
// Usage: node scripts/pack-puzzles.mjs <dir containing easy.txt, medium.txt, hard.txt, diabolical.txt>
// The bank's lines are ordered by hash, so taking the first N matches is an unbiased sample.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const PER_LEVEL = 5000;
const LEVELS = [
  { name: 'easy', source: 'easy.txt' },
  { name: 'medium', source: 'medium.txt' },
  { name: 'hard', source: 'hard.txt' },
  // Diabolical goes up to ~9.3, where puzzles need forcing chains. Cap it so Expert stays fun.
  { name: 'expert', source: 'diabolical.txt', maxRating: 7.0 },
];

const srcDir = process.argv[2];
if (!srcDir) {
  console.error('Usage: node scripts/pack-puzzles.mjs <bank dir>');
  process.exit(1);
}

mkdirSync('public/puzzles', { recursive: true });
for (const level of LEVELS) {
  const out = [];
  for (const line of readFileSync(join(srcDir, level.source), 'utf8').split('\n')) {
    const [, digits, rating] = line.trim().split(/\s+/);
    if (!digits || !/^[0-9]{81}$/.test(digits)) continue;
    if (level.maxRating && Number(rating) > level.maxRating) continue;
    out.push(digits);
    if (out.length === PER_LEVEL) break;
  }
  writeFileSync(`public/puzzles/${level.name}.txt`, out.join('\n') + '\n');
  console.log(`${level.name}: ${out.length} puzzles`);
}
