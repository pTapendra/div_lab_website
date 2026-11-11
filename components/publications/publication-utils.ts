import {
  publications as publicationData,
} from "@/data/publications";

import {
  getPublicationTopics,
  type PublicationTopic,
} from "@/data/publication-topics";

/*
 * Derive the publication type
 * directly from existing data.
 *
 * This avoids requiring
 * publications.ts to export
 * another custom type.
 */
export type Publication =
  (typeof publicationData)[number];

/*
 * Existing publication +
 * topics used by UpSet.
 */
export type PublicationWithTopics =
  Publication & {
    topics: PublicationTopic[];
  };

/*
 * Attach UpSet topics.
 */
export function withTopics(
  publications: readonly Publication[]
): PublicationWithTopics[] {
  return publications.map(
    (publication) => ({
      ...publication,

      topics: getPublicationTopics(
        publication.slug
      ),
    })
  );
}

/*
 * Group publications
 * newest year first.
 */
export function groupPublicationsByYear(
  publications: PublicationWithTopics[]
) {
  const groups =
    new Map<
      number,
      PublicationWithTopics[]
    >();

  for (const publication of publications) {
    const year =
      Number(publication.year);

    const current =
      groups.get(year) ?? [];

    current.push(publication);

    groups.set(
      year,
      current
    );
  }

  return Array.from(
    groups.entries()
  )
    .sort(
      ([yearA], [yearB]) =>
        yearB - yearA
    )
    .map(
      ([year, items]) => ({
        year,
        items,
      })
    );
}