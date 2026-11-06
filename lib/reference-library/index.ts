import { readReferencePapers, writeReferencePapers } from "./storage";
import type { ReferencePaper } from "./types";
import { validateReferencePaperInput } from "./validation";

export type { ReferencePaper, ReferencePaperInput } from "./types";

function normalizePaper(paper: ReferencePaper): ReferencePaper {
  return {
    ...paper,
    keywords: paper.keywords ?? "",
  };
}

export async function getReferencePapers(): Promise<ReferencePaper[]> {
  const papers = await readReferencePapers();
  return papers.map(normalizePaper);
}

export async function createReferencePaper(input: unknown) {
  const papers = await getReferencePapers();
  const parsed = validateReferencePaperInput(input);
  const now = new Date().toISOString();

  const paper: ReferencePaper = {
    ...parsed,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  await writeReferencePapers([...papers, paper]);
  return paper;
}

export async function updateReferencePaper(id: string, input: unknown) {
  const papers = await getReferencePapers();
  const index = papers.findIndex((paper) => paper.id === id);

  if (index === -1) return null;

  const parsed = validateReferencePaperInput(input);
  papers[index] = {
    ...papers[index],
    ...parsed,
    updatedAt: new Date().toISOString(),
  };

  await writeReferencePapers(papers);
  return papers[index];
}

export async function deleteReferencePaper(id: string) {
  const papers = await getReferencePapers();
  const next = papers.filter((paper) => paper.id !== id);

  if (next.length === papers.length) return false;

  await writeReferencePapers(next);
  return true;
}
