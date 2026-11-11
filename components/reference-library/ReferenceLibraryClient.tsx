"use client";

import { FiX } from "react-icons/fi";
import type { ReferencePaper } from "@/lib/reference-library";
import ReferenceLibraryHeader from "./ReferenceLibraryHeader";
import ReferenceLibraryToolbar from "./ReferenceLibraryToolbar";
import ReferenceLoginModal from "./ReferenceLoginModal";
import ReferencePaperList from "./ReferencePaperList";
import ReferencePaperModal from "./ReferencePaperModal";
import { useReferenceLibrary } from "./useReferenceLibrary";

export default function ReferenceLibraryClient({
  initialPapers,
  initiallyAuthenticated,
}: {
  initialPapers: ReferencePaper[];
  initiallyAuthenticated: boolean;
}) {
  const library = useReferenceLibrary(initialPapers, initiallyAuthenticated);

  return (
    <>
      <ReferenceLibraryHeader
        isAuthenticated={library.isAuthenticated}
        busy={library.busy}
        onAdd={library.requestAddPaper}
        onSignOut={library.signOut}
      />

      <section className="bg-white px-2 py-2 sm:px-3 md:px-4 md:py-3">
        <div className="w-full">
          <ReferenceLibraryToolbar
            query={library.query}
            sort={library.sort}
            venue={library.venue}
            venues={library.venues}
            count={library.filteredPapers.length}
            onQueryChange={library.setQuery}
            onSortChange={library.setSort}
            onVenueChange={library.setVenue}
          />

          {library.error && !library.modal && (
            <div className="mt-4 flex items-start justify-between gap-3 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              <span>{library.error}</span>
              <button type="button" onClick={() => library.setError("")} aria-label="Dismiss error">
                <FiX />
              </button>
            </div>
          )}

          <ReferencePaperList
            papers={library.filteredPapers}
            openBibtexId={library.openBibtexId}
            copiedId={library.copiedId}
            isAuthenticated={library.isAuthenticated}
            busy={library.busy}
            onToggleBibtex={library.toggleBibtex}
            onCopyBibtex={library.copyBibtex}
            onEdit={library.openEditModal}
            onDelete={library.deletePaper}
          />
        </div>
      </section>

      {library.modal === "login" && (
        <ReferenceLoginModal
          login={library.login}
          error={library.error}
          busy={library.busy}
          onLoginChange={library.setLogin}
          onSubmit={library.signIn}
          onClose={library.closeModal}
        />
      )}

      {library.modal === "paper" && library.isAuthenticated && (
        <ReferencePaperModal
          form={library.form}
          editing={Boolean(library.editingId)}
          error={library.error}
          busy={library.busy}
          onFormChange={library.setForm}
          onSubmit={library.submitPaper}
          onClose={library.closeModal}
        />
      )}
    </>
  );
}
