import { get, put } from "@vercel/blob";
import seedPapers from "@/data/reference-library.json";
import type { ReferencePaper } from "../types";

const BLOB_PATH = "reference-library/reference-library.json";

function normalizePapers(papers: ReferencePaper[]): ReferencePaper[] {
  return papers.map((paper) => ({
    ...paper,
    keywords: paper.keywords ?? "",
  }));
}

async function parseBlobStream(stream: ReadableStream<Uint8Array> | null) {
  if (!stream) return [];
  const raw = await new Response(stream).text();
  return normalizePapers(JSON.parse(raw) as ReferencePaper[]);
}

async function seedBlobStore(): Promise<ReferencePaper[]> {
  const seed = normalizePapers(seedPapers as ReferencePaper[]);

  try {
    await put(BLOB_PATH, `${JSON.stringify(seed, null, 2)}\n`, {
      access: "private",
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return seed;
  } catch (error) {
    // Another request may have created the seed at the same time.
    const existing = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
    });

    if (existing?.statusCode === 200) {
      return parseBlobStream(existing.stream);
    }

    throw error;
  }
}

export async function readBlobPapers(): Promise<ReferencePaper[]> {
  const result = await get(BLOB_PATH, {
    access: "private",
    useCache: false,
  });

  if (!result) {
    return seedBlobStore();
  }

  if (result.statusCode !== 200) {
    throw new Error("Unable to read the Reference Library from Vercel Blob.");
  }

  return parseBlobStream(result.stream);
}

export async function writeBlobPapers(papers: ReferencePaper[]) {
  await put(BLOB_PATH, `${JSON.stringify(papers, null, 2)}\n`, {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}
