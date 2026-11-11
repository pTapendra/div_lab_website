"use client";

import { ReactNode, useEffect } from "react";
import { FiX } from "react-icons/fi";

export function ReferenceModal({
  title,
  children,
  onClose,
  busy,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  busy: boolean;
  wide?: boolean;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose();
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [busy, onClose]);

  return (
    <div
      className="reference-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reference-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <div className={`reference-modal-panel ${wide ? "reference-modal-panel-wide" : ""}`}>
        <div className="reference-modal-header">
          <h2 id="reference-modal-title" className="text-xl font-semibold text-neutral-950">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="reference-modal-close"
            aria-label="Close dialog"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
        <div className="reference-modal-body">{children}</div>
      </div>
    </div>
  );
}

export function ReferenceField({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

export function ReferenceModalError({ message }: { message: string }) {
  return (
    <p role="alert" className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </p>
  );
}
