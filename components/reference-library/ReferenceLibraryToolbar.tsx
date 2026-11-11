"use client";

import { FiSearch, FiX } from "react-icons/fi";
import type { SortOption } from "./types";

export default function ReferenceLibraryToolbar({
  query,
  sort,
  venue,
  venues,
  count,
  onQueryChange,
  onSortChange,
  onVenueChange,
}: {
  query: string;
  sort: SortOption;
  venue: string;
  venues: string[];
  count: number;
  onQueryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onVenueChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-neutral-200 pb-2 lg:flex-row lg:items-center">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search reference library</span>
        <FiSearch
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          size={18}
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search title, author, venue, year, or keywords"
          className="h-9 w-full rounded-md border border-neutral-300 bg-white pl-10 pr-10 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#841617] focus:ring-2 focus:ring-[#841617]/10"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Clear search"
          >
            <FiX aria-hidden="true" />
          </button>
        )}
      </label>

      <div className="flex items-center gap-3 sm:justify-between lg:justify-end">
        <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-neutral-600 sm:flex-none">
          <span className="hidden sm:inline">Venue</span>
          <select
            value={venue}
            onChange={(event) => onVenueChange(event.target.value)}
            aria-label="Filter by venue"
            className="h-9 min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-800 outline-none focus:border-[#841617] focus:ring-2 focus:ring-[#841617]/10 sm:w-48"
          >
            <option value="">All Venues</option>
            {venues.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-neutral-600 sm:flex-none">
          <span className="hidden sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="h-9 min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-800 outline-none focus:border-[#841617] focus:ring-2 focus:ring-[#841617]/10 sm:w-48"
          >
            <option value="year-desc">Year: Newest first</option>
            <option value="year-asc">Year: Oldest first</option>
            <option value="title-asc">Title: A–Z</option>
          </select>
        </label>

        <div className="whitespace-nowrap text-sm text-neutral-600">
          <strong className="font-semibold text-neutral-900">{count}</strong>{" "}
          {count === 1 ? "paper" : "papers"}
        </div>
      </div>
    </div>
  );
}
