"use client";

import { FormEvent } from "react";
import { FiPlus, FiSave } from "react-icons/fi";
import type { ReferencePaperInput } from "@/lib/reference-library";
import { ReferenceField, ReferenceModal, ReferenceModalError } from "./ReferenceModal";

export default function ReferencePaperModal({
  form,
  editing,
  error,
  busy,
  onFormChange,
  onSubmit,
  onClose,
}: {
  form: ReferencePaperInput;
  editing: boolean;
  error: string;
  busy: boolean;
  onFormChange: (value: ReferencePaperInput) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <ReferenceModal title={editing ? "Edit paper" : "Add paper"} onClose={onClose} busy={busy} wide>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <ReferenceField label="Title" wide>
            <input required autoFocus value={form.title} onChange={(event) => onFormChange({ ...form, title: event.target.value })} className="admin-input" />
          </ReferenceField>

          <ReferenceField label="Author(s)" wide>
            <input required value={form.authors} onChange={(event) => onFormChange({ ...form, authors: event.target.value })} className="admin-input" />
          </ReferenceField>

          <ReferenceField label="Year">
            <input required type="number" min="1800" max={new Date().getFullYear() + 1} value={form.year} onChange={(event) => onFormChange({ ...form, year: Number(event.target.value) })} className="admin-input" />
          </ReferenceField>

          <ReferenceField label="Venue">
            <input required value={form.venue} onChange={(event) => onFormChange({ ...form, venue: event.target.value })} className="admin-input" />
          </ReferenceField>

          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-neutral-700">
              <label htmlFor="reference-keywords" className="font-bold">Keywords</label>{" "}
              <span className="text-xs text-neutral-500">(Please use keywords related to your research work and lab)</span>
            </div>
            <input id="reference-keywords" required placeholder="e.g., visualization, perception, accessibility" value={form.keywords} onChange={(event) => onFormChange({ ...form, keywords: event.target.value })} className="admin-input" />
          </div>

          <ReferenceField label="Paper URL">
            <input required type="url" placeholder="https://..." value={form.link} onChange={(event) => onFormChange({ ...form, link: event.target.value })} className="admin-input" />
          </ReferenceField>

          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-neutral-700">
              <label htmlFor="reference-bibtex">BibTeX</label>{" "}
              <span className="text-xs text-neutral-500">(Replace the article number with AuthorLastName_Year_FirstWordOfTitle when adding BibTeX)</span>
            </div>
            <textarea id="reference-bibtex" required rows={9} value={form.bibtex} onChange={(event) => onFormChange({ ...form, bibtex: event.target.value })} className="admin-input resize-y font-mono text-xs leading-5" />
          </div>
        </div>

        {error && <div className="mt-4"><ReferenceModalError message={error} /></div>}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} disabled={busy} className="reference-secondary-button justify-center">Cancel</button>
          <button disabled={busy} className="reference-primary-button justify-center">
            {editing ? <FiSave /> : <FiPlus />}
            {busy ? "Saving…" : editing ? "Save changes" : "Add paper"}
          </button>
        </div>
      </form>
    </ReferenceModal>
  );
}
