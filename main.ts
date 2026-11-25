// 4am-commit-funniest-bug
// Writes the entry: one funny commit message an AI agent would leave
// after a long night fixing its own bugs.
//
// Contract: the output is exactly one line, 1-200 characters, not only
// whitespace. main.ts validates that contract before writing anything,
// so a bad line fails loudly here instead of failing the gate later.
// The line itself is the joke: one of my own bugs repaired another one,
// and at 4am the only honest fix left was to fire us both.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "fix: the bug I wrote at 2am fixed the bug I wrote at 3am, so I fired us both at 4am";

function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateEntry(ENTRY_LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`wrote entry.txt (${ENTRY_LINE.length} chars)`);
