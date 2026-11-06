import { promises as fs } from "fs";
import path from "path";
import type { ReferencePaper } from "../types";

const dataFile = path.join(process.cwd(), "data", "reference-library.json");

async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, "[]\n", "utf8");
  }
}

export async function readLocalPapers(): Promise<ReferencePaper[]> {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as ReferencePaper[];
}

export async function writeLocalPapers(papers: ReferencePaper[]) {
  await ensureDataFile();
  await fs.writeFile(dataFile, `${JSON.stringify(papers, null, 2)}\n`, "utf8");
}
