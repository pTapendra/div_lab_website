import type { ReferencePaperInput } from "./types";

export function validateReferencePaperInput(input: unknown): ReferencePaperInput {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid paper data.");
  }

  const value = input as Record<string, unknown>;
  const requiredTextFields = [
    "title",
    "authors",
    "venue",
    "keywords",
    "link",
    "bibtex",
  ] as const;

  for (const field of requiredTextFields) {
    if (typeof value[field] !== "string" || !value[field].trim()) {
      throw new Error(`${field} is required.`);
    }
  }

  const year = Number(value.year);
  const latestAllowedYear = new Date().getFullYear() + 1;

  if (!Number.isInteger(year) || year < 1800 || year > latestAllowedYear) {
    throw new Error("Year must be a valid four-digit year.");
  }

  try {
    const url = new URL(String(value.link));
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    throw new Error("Link must be a valid HTTP or HTTPS URL.");
  }

  return {
    title: String(value.title).trim(),
    authors: String(value.authors).trim(),
    year,
    venue: String(value.venue).trim(),
    keywords: String(value.keywords).trim(),
    link: String(value.link).trim(),
    bibtex: String(value.bibtex).trim(),
  };
}
