"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReferencePaper, ReferencePaperInput } from "@/lib/reference-library";
import type { LoginIntent, ReferenceModalType, SortOption } from "./types";

const createEmptyForm = (): ReferencePaperInput => ({
  title: "",
  authors: "",
  year: new Date().getFullYear(),
  venue: "",
  keywords: "",
  link: "",
  bibtex: "",
});

export function useReferenceLibrary(
  initialPapers: ReferencePaper[],
  initiallyAuthenticated: boolean
) {
  const [papers, setPapers] = useState(initialPapers);
  const [isAuthenticated, setIsAuthenticated] = useState(initiallyAuthenticated);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("year-desc");
  const [venue, setVenue] = useState("");
  const [openBibtexId, setOpenBibtexId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modal, setModal] = useState<ReferenceModalType>(null);
  const [loginIntent, setLoginIntent] = useState<LoginIntent>(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [form, setForm] = useState<ReferencePaperInput>(createEmptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const venues = useMemo(() => {
    return [...new Set(papers.map((paper) => paper.venue.trim()).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));
  }, [papers]);

  const filteredPapers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matched = papers.filter((paper) => {
      const matchesVenue = !venue || paper.venue.trim() === venue;
      const matchesSearch = !normalizedQuery || [
        paper.title,
        paper.authors,
        paper.venue,
        paper.keywords ?? "",
        paper.year.toString(),
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesVenue && matchesSearch;
    });

    return matched.sort((a, b) => {
      if (sort === "year-desc") return b.year - a.year || a.title.localeCompare(b.title);
      if (sort === "year-asc") return a.year - b.year || a.title.localeCompare(b.title);
      return a.title.localeCompare(b.title);
    });
  }, [papers, query, sort, venue]);

  const closeModal = () => {
    if (busy) return;
    setModal(null);
    setLoginIntent(null);
    setError("");
    setEditingId(null);
    setForm(createEmptyForm());
  };

  const openAddModal = () => {
    setError("");
    setEditingId(null);
    setForm(createEmptyForm());
    setModal("paper");
  };

  const requestAddPaper = () => {
    if (isAuthenticated) {
      openAddModal();
      return;
    }

    setError("");
    setLogin({ username: "", password: "" });
    setLoginIntent("add");
    setModal("login");
  };

  const openEditModal = (paper: ReferencePaper) => {
    setError("");
    setEditingId(paper.id);
    setForm({
      title: paper.title,
      authors: paper.authors,
      year: paper.year,
      venue: paper.venue,
      keywords: paper.keywords ?? "",
      link: paper.link,
      bibtex: paper.bibtex,
    });
    setModal("paper");
  };

  const copyBibtex = async (paper: ReferencePaper) => {
    try {
      await navigator.clipboard.writeText(paper.bibtex);
      setCopiedId(paper.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setError("Unable to copy the citation. Please copy it manually.");
    }
  };

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(body.error ?? "Unable to sign in.");
        return;
      }

      const intent = loginIntent;
      setIsAuthenticated(true);
      setLogin({ username: "", password: "" });
      setLoginIntent(null);
      setError("");

      if (intent === "add") {
        setEditingId(null);
        setForm(createEmptyForm());
        setModal("paper");
      } else if (intent === "resume-paper") {
        setModal("paper");
      } else {
        setModal(null);
      }
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setModal(null);
      setLoginIntent(null);
      setEditingId(null);
      setForm(createEmptyForm());
      setError("");
    } finally {
      setBusy(false);
    }
  };

  const submitPaper = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    const endpoint = editingId
      ? `/api/reference-library/${editingId}`
      : "/api/reference-library";

    try {
      const response = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = (await response.json()) as ReferencePaper & { error?: string };

      if (response.status === 401) {
        setIsAuthenticated(false);
        setLoginIntent("resume-paper");
        setModal("login");
        setError("Your session expired. Please sign in again.");
        return;
      }

      if (!response.ok) {
        setError(body.error ?? "Unable to save the paper.");
        return;
      }

      setPapers((current) =>
        editingId
          ? current.map((paper) => (paper.id === editingId ? body : paper))
          : [...current, body]
      );
      setModal(null);
      setEditingId(null);
      setForm(createEmptyForm());
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const deletePaper = async (paper: ReferencePaper) => {
    if (!window.confirm(`Delete “${paper.title}”? This action cannot be undone.`)) return;

    setBusy(true);
    setError("");

    try {
      const response = await fetch(`/api/reference-library/${paper.id}`, {
        method: "DELETE",
      });
      const body = (await response.json()) as { error?: string };

      if (response.status === 401) {
        setIsAuthenticated(false);
        setLogin({ username: "", password: "" });
        setLoginIntent(null);
        setModal("login");
        setError("Your session expired. Please sign in again.");
        return;
      }

      if (!response.ok) {
        setError(body.error ?? "Unable to delete the paper.");
        return;
      }

      setPapers((current) => current.filter((item) => item.id !== paper.id));
      setOpenBibtexId((current) => (current === paper.id ? null : current));
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const toggleBibtex = (paperId: string) => {
    setOpenBibtexId((current) => (current === paperId ? null : paperId));
  };

  return {
    filteredPapers,
    isAuthenticated,
    query,
    sort,
    venue,
    venues,
    openBibtexId,
    copiedId,
    modal,
    login,
    form,
    editingId,
    error,
    busy,
    setQuery,
    setSort,
    setVenue,
    setLogin,
    setForm,
    setError,
    closeModal,
    requestAddPaper,
    openEditModal,
    copyBibtex,
    signIn,
    signOut,
    submitPaper,
    deletePaper,
    toggleBibtex,
  };
}
