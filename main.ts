import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Cat Reviews Its Human: one funny single-line one-star review from a
// house cat about its human, at most 200 characters.
const LINE =
  "One star. The human refills the bowl on time but insists on talking to it first, like the food needs a pep talk.";
const MAX_CHARS = 200;

function main(): void {
  // Revision: also reject line breaks and blank text, matching the sealed gate exactly.
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  // Revision 2: the review must keep its one-star shape and mention the
  // bowl, so the line stays a cat review and not a generic complaint.
  if (!LINE.startsWith("One star.") || !LINE.toLowerCase().includes("bowl")) {
    throw new Error("entry must open as a one-star review about the bowl");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
