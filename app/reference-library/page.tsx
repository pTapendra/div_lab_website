import type { Metadata } from "next";
import ReferenceLibraryClient from "@/components/reference-library/ReferenceLibraryClient";
import { getLabSession } from "@/lib/lab-auth";
import { getReferencePapers } from "@/lib/reference-library";

export const metadata: Metadata = {
  title: "Reference Library | DIV Lab",
  description:
    "Research papers studied, reviewed, and referenced by DIV Lab members.",
};

export const dynamic = "force-dynamic";

export default async function ReferenceLibraryPage() {
  const [papers, session] = await Promise.all([
    getReferencePapers(),
    getLabSession(),
  ]);

  return (
    <ReferenceLibraryClient
      initialPapers={papers}
      initiallyAuthenticated={Boolean(session)}
    />
  );
}
