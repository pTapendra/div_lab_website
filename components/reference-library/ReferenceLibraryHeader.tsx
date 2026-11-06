"use client";

import { FiLogOut, FiPlus } from "react-icons/fi";

export default function ReferenceLibraryHeader({
  isAuthenticated,
  busy,
  onAdd,
  onSignOut,
}: {
  isAuthenticated: boolean;
  busy: boolean;
  onAdd: () => void;
  onSignOut: () => void;
}) {
  return (
    <section className="sticky top-14 z-30 border-b border-neutral-200 bg-white px-3 py-4 sm:px-4 md:top-0 md:px-5 md:py-5">
      <div className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
            Reference Library
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={onAdd} className="reference-primary-button">
              <FiPlus aria-hidden="true" /> Add paper
            </button>

            {isAuthenticated && (
              <button
                type="button"
                onClick={onSignOut}
                disabled={busy}
                className="reference-secondary-button"
              >
                <FiLogOut aria-hidden="true" /> Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
