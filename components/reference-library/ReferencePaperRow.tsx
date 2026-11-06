"use client";

import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiEdit2,
  FiExternalLink,
  FiTrash2,
} from "react-icons/fi";
import type { ReferencePaper } from "@/lib/reference-library";

const KEYWORD_COLORS = [
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#08519c",
  "#08306b",
];

export default function ReferencePaperRow({
  paper,
  rowIndex,
  isOpen,
  isCopied,
  isAuthenticated,
  busy,
  onToggleBibtex,
  onCopyBibtex,
  onEdit,
  onDelete,
}: {
  paper: ReferencePaper;
  rowIndex: number;
  isOpen: boolean;
  isCopied: boolean;
  isAuthenticated: boolean;
  busy: boolean;
  onToggleBibtex: () => void;
  onCopyBibtex: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="border-b border-neutral-200 bg-white transition-colors hover:bg-neutral-50/70">
      <div className="grid gap-1 px-1.5 py-1.5 md:grid-cols-[minmax(0,1fr)_140px_52px_64px_44px_72px] md:items-center md:gap-3 md:px-2">
        <div className="min-w-0">
          <h2 className="text-[13px] font-medium leading-4 text-neutral-950 md:hidden">
            {paper.title}
          </h2>

          <h2
            className="hidden truncate text-[13px] font-medium leading-4 text-neutral-950 md:block"
            title={paper.title}
          >
            {paper.title}
          </h2>

          <p
            className="mt-0.5 truncate text-[12px] leading-4 text-neutral-500"
            title={paper.authors}
          >
            {paper.authors}
          </p>

          {paper.keywords && (
            <p
              className="truncate text-[12px] font-bold italic leading-4 text-neutral-500"
              title={paper.keywords}
            >
              <span
                style={{
                  color: KEYWORD_COLORS[rowIndex % KEYWORD_COLORS.length],
                }}
              >
                Keywords:
              </span>{" "}
              {paper.keywords}
            </p>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-1.5 md:hidden">
            <span className="text-[11px] font-medium text-neutral-700">
              {paper.venue}, {paper.year}
            </span>

            <RowActions
              paper={paper}
              isOpen={isOpen}
              isAuthenticated={isAuthenticated}
              busy={busy}
              onToggleBibtex={onToggleBibtex}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>

        <div className="hidden min-w-0 md:block">
          <div
            className="truncate text-[12px] font-medium leading-4 text-neutral-800"
            title={paper.venue}
          >
            {paper.venue}
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:justify-center">
          <span className="text-[12px] font-medium text-neutral-700">
            {paper.year}
          </span>
        </div>

        <div className="hidden md:flex md:items-center md:justify-center">
          <button
            type="button"
            onClick={onToggleBibtex}
            className="reference-row-action"
            aria-label={`${isOpen ? "Hide" : "Show"} BibTeX for ${paper.title}`}
            title="BibTeX"
          >
            <span className="text-[10px] font-bold">BIB</span>
            <FiChevronDown
              className={`transition-transform ${isOpen ? "rotate-180" : ""
                }`}
              size={13}
            />
          </button>
        </div>

        <div className="hidden md:flex md:items-center md:justify-center">
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="reference-row-action"
            aria-label={`Open ${paper.title}`}
            title="Open paper"
          >
            <FiExternalLink aria-hidden="true" />
          </a>
        </div>

        <div className="hidden md:flex md:items-center md:justify-end">
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="reference-row-action"
                aria-label={`Edit ${paper.title}`}
                title="Edit"
              >
                <FiEdit2 aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onDelete}
                disabled={busy}
                className="reference-row-action reference-row-action-danger"
                aria-label={`Delete ${paper.title}`}
                title="Delete"
              >
                <FiTrash2 aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-neutral-50 px-3 py-2 md:px-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              BibTeX
            </span>

            <button
              type="button"
              onClick={onCopyBibtex}
              className="inline-flex items-center gap-1.5 rounded border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
            >
              {isCopied ? <FiCheck /> : <FiCopy />}
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre className="max-h-52 overflow-auto whitespace-pre-wrap break-words rounded border border-neutral-200 bg-white p-2.5 font-mono text-[11px] leading-4 text-neutral-700">
            {paper.bibtex}
          </pre>
        </div>
      )}
    </article>
  );
}

function RowActions({
  paper,
  isOpen,
  isAuthenticated,
  busy,
  onToggleBibtex,
  onEdit,
  onDelete,
}: {
  paper: ReferencePaper;
  isOpen: boolean;
  isAuthenticated: boolean;
  busy: boolean;
  onToggleBibtex: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <a
        href={paper.link}
        target="_blank"
        rel="noopener noreferrer"
        className="reference-row-action"
        aria-label={`Open ${paper.title}`}
        title="Open paper"
      >
        <FiExternalLink aria-hidden="true" />
      </a>

      <button
        type="button"
        onClick={onToggleBibtex}
        className="reference-row-action"
        aria-label={`${isOpen ? "Hide" : "Show"} BibTeX for ${paper.title}`}
        title="BibTeX"
      >
        <span className="text-[10px] font-bold">BIB</span>

        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          size={13}
        />
      </button>

      {isAuthenticated && (
        <>
          <button
            type="button"
            onClick={onEdit}
            className="reference-row-action"
            aria-label={`Edit ${paper.title}`}
            title="Edit"
          >
            <FiEdit2 aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="reference-row-action reference-row-action-danger"
            aria-label={`Delete ${paper.title}`}
            title="Delete"
          >
            <FiTrash2 aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
