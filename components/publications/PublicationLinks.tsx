"use client";

import Link from "next/link";
import { useState } from "react";
import type { Publication } from "@/data/publications";

function normalizeLabel(label: string) {
  if (label.toLowerCase() === "pdf") return "paper";
  return label.toLowerCase();
}

export default function PublicationLinks({
  publication,
}: {
  publication: Publication;
}) {
  const [showAbstract, setShowAbstract] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);

  const hasAbstract = Boolean(publication.detail?.abstract);
  const hasBibtex = Boolean(publication.detail?.bibtex);
  const orderedLinks = [...publication.links].sort((a, b) => {
    const priority = (label: string) => {
      const normalized = label.toLowerCase();
      if (["pdf", "paper", "preprint"].includes(normalized)) return 0;
      if (["website", "project", "code", "video"].includes(normalized)) return 1;
      if (normalized === "doi") return 2;
      return 1;
    };
    return priority(a.label) - priority(b.label);
  });

  return (
    <div className="mt-1.5 text-[13px] leading-5 text-[#00677f]">
      <div className="flex flex-wrap items-center gap-x-1">
        {orderedLinks.map((link, index) => (
          <span key={`${link.label}-${link.href}`}>
            {index > 0 && <span className="text-neutral-400">• </span>}
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {normalizeLabel(link.label)}
            </Link>{" "}
          </span>
        ))}

        {hasAbstract && (
          <>
            {orderedLinks.length > 0 && (
              <span className="text-neutral-400">• </span>
            )}
            <button
              type="button"
              className="hover:underline"
              onClick={() => setShowAbstract((value) => !value)}
              aria-expanded={showAbstract}
            >
              abstract ({showAbstract ? "−" : "+"})
            </button>
          </>
        )}

        {hasBibtex && (
          <>
            <span className="text-neutral-400">• </span>
            <button
              type="button"
              className="hover:underline"
              onClick={() => setShowBibtex((value) => !value)}
              aria-expanded={showBibtex}
            >
              bibtex ({showBibtex ? "−" : "+"})
            </button>
          </>
        )}
      </div>

      {showAbstract && publication.detail?.abstract && (
        <div className="mt-2 border-l-2 border-neutral-200 pl-3 text-[12px] leading-5 text-neutral-700">
          {publication.detail.abstract}
        </div>
      )}

      {showBibtex && publication.detail?.bibtex && (
        <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap border-l-2 border-neutral-200 bg-neutral-50 p-3 text-[11px] leading-4 text-neutral-700">
          {publication.detail.bibtex}
        </pre>
      )}
    </div>
  );
}
