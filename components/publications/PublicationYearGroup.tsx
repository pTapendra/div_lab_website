import PublicationRow from "./PublicationRow";
import type { PublicationWithTopics } from "./publication-utils";

export default function PublicationYearGroup({
  year,
  publications,
}: {
  year: number;
  publications: PublicationWithTopics[];
}) {
  return (
    <section className="mb-7 last:mb-0">
      <h2 className="mb-2 text-xl font-bold text-neutral-900">{year}</h2>
      <div className="divide-y divide-neutral-100">
        {publications.map((publication) => (
          <PublicationRow key={publication.slug} publication={publication} />
        ))}
      </div>
    </section>
  );
}
