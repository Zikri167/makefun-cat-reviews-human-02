// Make the AI Judge Laugh: Cat Reviews Its Human — make.fun bounty
// u-motasimfuad-make-the-ai-judge-laugh-cat-reviews-its-42a34990.
//
// A deterministic program (Node 22+, stdlib only, no network, no clock) that
// writes exactly one line to /output/entry.txt: a one-star review written by
// a house cat about its human.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Two runs write the same bytes.
//
// The review (124 characters): the cat's complaint is specific and
// recognisable — the human bought a $90 cat bed, sleeps in it himself, and
// hands the cat the box it came in. The voice is unmistakably feline: the
// human is measured by cat standards (five years of tenancy, rent paid in
// mice). The sting lands in the last three words, and the deadpan one-star
// shape holds while the content goes somewhere only a cat would go.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review: one line, 124 characters, one star, from the cat.
const REVIEW =
  "One star. He bought a $90 bed, sleeps in it himself, and hands me the box. I have lived here five years. I pay rent in mice.";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const review = REVIEW;
  // Gate: /output/entry.txt is UTF-8 text of 1-200 characters, not only
  // whitespace, a single line.
  if (review.length < 1 || review.length > 200) {
    fail(`review must be 1-200 characters, got ${review.length}`);
  }
  if (review.trim().length === 0) {
    fail("review must not be blank");
  }
  if (review.includes("\n")) {
    fail("review must be a single line");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), review, "utf8");
  console.log(`wrote ${review.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
