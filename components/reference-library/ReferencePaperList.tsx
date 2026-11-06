"use client";

import type { ReferencePaper } from "@/lib/reference-library";
import ReferencePaperRow from "./ReferencePaperRow";

export default function ReferencePaperList({
  papers,
  openBibtexId,
  copiedId,
  isAuthenticated,
  busy,
  onToggleBibtex,
  onCopyBibtex,
  onEdit,
  onDelete,
}: {
  papers: ReferencePaper[];
  openBibtexId: string | null;
  copiedId: string | null;
  isAuthenticated: boolean;
  busy: boolean;
  onToggleBibtex: (paperId: string) => void;
  onCopyBibtex: (paper: ReferencePaper) => void;
  onEdit: (paper: ReferencePaper) => void;
  onDelete: (paper: ReferencePaper) => void;
}) {
  if (!papers.length) {
    return (
      <div className="border-b border-neutral-200 py-16 text-center text-sm text-neutral-500">
        No papers match your search.
      </div>
    );
  }

  return (
    <div className="border-t border-neutral-200">
      {papers.map((paper, index) => (
        <ReferencePaperRow
          key={paper.id}
          paper={paper}
          rowIndex={index}
          isOpen={openBibtexId === paper.id}
          isCopied={copiedId === paper.id}
          isAuthenticated={isAuthenticated}
          busy={busy}
          onToggleBibtex={() => onToggleBibtex(paper.id)}
          onCopyBibtex={() => onCopyBibtex(paper)}
          onEdit={() => onEdit(paper)}
          onDelete={() => onDelete(paper)}
        />
      ))}
    </div>
  );
}
