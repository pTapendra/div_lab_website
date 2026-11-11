"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiGooglescholar } from "react-icons/si";
import { publications } from "@/data/publications";

import PublicationYearGroup from "./PublicationYearGroup";
import UpSetFilter from "./UpSetFilter";
import {
  groupPublicationsByYear,
  withTopics,
} from "./publication-utils";

export default function PublicationsClient() {
  const allPublications = useMemo(
    () => withTopics(publications),
    []
  );

  /*
   * Permanent clicked filter.
   */
  const [selectedSlugs, setSelectedSlugs] = useState<string[] | null>(null);

  /*
   * Temporary hover filter.
   */
  const [previewSlugs, setPreviewSlugs] = useState<string[] | null>(null);

  /*
   * Hover has priority.
   */
  const activeSlugs = previewSlugs ?? selectedSlugs;

  /*
   * Visible results.
   */
  const visiblePublications = useMemo(() => {
    if (!activeSlugs) {
      return allPublications;
    }

    return allPublications.filter((publication) =>
      activeSlugs.includes(publication.slug)
    );
  }, [allPublications, activeSlugs]);

  /*
   * Group by year.
   */
  const yearGroups = useMemo(
    () => groupPublicationsByYear(visiblePublications),
    [visiblePublications]
  );

  const isPreviewing = previewSlugs !== null;
  const isFiltered = activeSlugs !== null;

  function clearFilter() {
    setPreviewSlugs(null);
    setSelectedSlugs(null);
  }

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-6 md:px-7">
      {/* Sticky Header */}
      <header className="sticky top-14 md:top-0 z-30 mb-5 border-b border-neutral-200 bg-white pb-3 pt-2">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">
          Publications
        </h1>


        <p className="text-sm leading-6 text-neutral-800">
          <Link
            href="https://scholar.google.com/citations?hl=en&tzom=300&user=jw9QYJcAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Scholar profile"
            className="mr-1 inline-flex align-middle text-[#00677f] hover:opacity-80"
          >
            <SiGooglescholar size={22} />
          </Link>{" "}
          We publish our research in leading venues in Visualization
          and Human-Computer Interaction (HCI), including IEEE VIS,
          IEEE TVCG, ACM CHI, EuroVis, and ACM ASSETS. Explore our
          complete{" "}
          <Link
            href="/venues"
            className="font-bold text-[#00677f] hover:underline"
          >
            list of venues
          </Link>
          . DIV-Lab member publications prior to 2024 were completed
          at University of North Carolina Chapel Hill VisuaLab and
          University of South Florida Visualization and Graphics Lab.
          Visit{" "}
          <Link
            href="http://jiquadcs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#00677f] hover:underline"
          >
            Dr. Quadri&apos;s personal website
          </Link>{" "}
          for a complete list of publications prior to 2024.
        </p>

      </header>

      {/* Matrix + results */}
      <div className="grid gap-7 lg:grid-cols-[290px_minmax(0,1fr)]">
        <UpSetFilter
          publications={allPublications}
          selectedSlugs={selectedSlugs}
          onSelectionChange={setSelectedSlugs}
          onPreviewChange={setPreviewSlugs}
        />

        <section className="min-w-0">
          {/* Result state */}
          {isFiltered && (
            <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2 text-[12px] text-neutral-600">
              <span>
                {isPreviewing ? "Previewing" : "Showing"}{" "}
                {visiblePublications.length} of {allPublications.length}{" "}
                publications
              </span>

              {!isPreviewing && selectedSlugs && (
                <button
                  type="button"
                  onClick={clearFilter}
                  className="font-medium text-[#00677f] hover:underline"
                >
                  Show all
                </button>
              )}
            </div>
          )}

          {/* Results */}
          {yearGroups.length > 0 ? (
            yearGroups.map(({ year, items }) => (
              <PublicationYearGroup
                key={year}
                year={year}
                publications={items}
              />
            ))
          ) : (
            <p className="py-10 text-sm text-neutral-500">
              No publications match this selection.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
