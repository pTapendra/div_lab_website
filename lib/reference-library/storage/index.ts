import type { ReferencePaper } from "../types";
import { readBlobPapers, writeBlobPapers } from "./blob";
import { readLocalPapers, writeLocalPapers } from "./local";

type StorageMode = "blob" | "local";

function getStorageMode(): StorageMode {
  const configuredMode = process.env.REFERENCE_LIBRARY_STORAGE;

  if (configuredMode === "blob" || configuredMode === "local") {
    return configuredMode;
  }

  return process.env.VERCEL === "1" ? "blob" : "local";
}

export async function readReferencePapers(): Promise<ReferencePaper[]> {
  return getStorageMode() === "blob" ? readBlobPapers() : readLocalPapers();
}

export async function writeReferencePapers(papers: ReferencePaper[]) {
  if (getStorageMode() === "blob") {
    await writeBlobPapers(papers);
    return;
  }

  await writeLocalPapers(papers);
}
