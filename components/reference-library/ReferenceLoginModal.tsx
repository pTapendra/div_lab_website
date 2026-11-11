"use client";

import { FormEvent } from "react";
import { FiLogIn } from "react-icons/fi";
import { ReferenceField, ReferenceModal, ReferenceModalError } from "./ReferenceModal";

export default function ReferenceLoginModal({
  login,
  error,
  busy,
  onLoginChange,
  onSubmit,
  onClose,
}: {
  login: { username: string; password: string };
  error: string;
  busy: boolean;
  onLoginChange: (value: { username: string; password: string }) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <ReferenceModal title="Sign in" onClose={onClose} busy={busy}>
      <form onSubmit={onSubmit} className="space-y-4">
        <ReferenceField label="Username">
          <input
            required
            autoFocus
            autoComplete="username"
            value={login.username}
            onChange={(event) => onLoginChange({ ...login, username: event.target.value })}
            className="admin-input"
          />
        </ReferenceField>

        <ReferenceField label="Password">
          <input
            required
            type="password"
            autoComplete="current-password"
            value={login.password}
            onChange={(event) => onLoginChange({ ...login, password: event.target.value })}
            className="admin-input"
          />
        </ReferenceField>

        {error && <ReferenceModalError message={error} />}

        <button disabled={busy} className="reference-primary-button w-full justify-center">
          <FiLogIn aria-hidden="true" /> {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </ReferenceModal>
  );
}
