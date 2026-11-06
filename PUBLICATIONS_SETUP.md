# Publications page structure

The Publications page is intentionally split into small files so future lab members do not need to work in one large component.

## Page entry point

- `app/publications/page.tsx`
  - Very small wrapper.
  - Renders `PublicationsClient`.

## Publication data

- `data/publications.ts`
  - Existing publication records.
  - Not restructured by this redesign.

- `data/publication-topics.ts`
  - Topic labels used by the publication list and UpSet filter.
  - Maps each publication slug to one or more topics.
  - Add/update topics here when a publication is added.

## UI components

- `components/publications/PublicationsClient.tsx`
  - Coordinates filtering and year grouping.

- `components/publications/UpSetFilter.tsx`
  - Lightweight interactive UpSet matrix.
  - Shows topic set sizes and exact topic intersections.
  - Clicking an intersection filters the publication list.
  - Based on the UpSet matrix model described at https://upset.app/.

- `components/publications/PublicationYearGroup.tsx`
  - Renders a year heading and its publications.

- `components/publications/PublicationRow.tsx`
  - Compact publication presentation: thumbnail, title, authors, venue, topics, and links.

- `components/publications/PublicationLinks.tsx`
  - External publication links.
  - Inline expandable abstract and BibTeX.

- `components/publications/AuthorsLine.tsx`
  - Author formatting and highlighted lab authors.

- `components/publications/publication-utils.ts`
  - Topic attachment, UpSet intersection calculation, and year grouping.

## Adding a publication

1. Add the publication record to `data/publications.ts` as before.
2. Add that publication's slug and topic list to `data/publication-topics.ts`.
3. No changes are required in the Publications components.

## UpSet behavior

Each publication has a topic membership set. Publications with the same exact topic combination form one intersection row. The count at the right of the row shows how many publications belong to that intersection. Selecting a row filters the list to that intersection; `Clear` restores all publications.
