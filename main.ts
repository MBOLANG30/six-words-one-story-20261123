// Six Words, One Story — make.fun entry
//
// Contract: write exactly one original six-word story to
// `<outputDir>/entry.txt`, where outputDir comes from the
// MAKEFUN_OUTPUT_DIR env var (fallback: /output).
//
// The story must be:
//   - exactly 6 words
//   - 1-60 UTF-8 characters
//   - not only whitespace
//   - one complete original story (a beginning, a turn, an implication)
//
// The program validates the story before writing and fails loudly
// (exit 1) if it does not meet the contract. It never deletes the
// output directory or anything inside it — the grader mounts that
// directory, so we only ADD entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The story: a whole life in six words. She kept the letter —
// the turn is that it is still unopened, years later. What was in
// it, why she kept it, and why she could never read it are left unsaid.
const STORY = "She kept his letter. Still unopened.";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

  // Validate the contract before writing anything.
  const charCount = [...STORY].length; // code points, close to UTF-8 chars for this text
  const byteCount = Buffer.byteLength(STORY, "utf8");
  const wordCount = countWords(STORY);

  if (STORY.trim().length === 0) {
    throw new Error("Story must not be blank.");
  }
  if (byteCount < 1 || byteCount > 60) {
    throw new Error(`Story must be 1-60 UTF-8 bytes, got ${byteCount}.`);
  }
  if (wordCount !== 6) {
    throw new Error(`Story must be exactly 6 words, got ${wordCount}.`);
  }
  void charCount;

  mkdirSync(outputDir, { recursive: true });
  // Write exactly the story text: no trailing newline, no extra text.
  writeFileSync(join(outputDir, "entry.txt"), STORY, "utf8");
}

main();
