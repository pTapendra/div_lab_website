import Image from "next/image";
import Link from "next/link";
import AuthorsLine from "./AuthorsLine";
import PublicationLinks from "./PublicationLinks";
import type { PublicationWithTopics } from "./publication-utils";

export default function PublicationRow({
  publication,
}: {
  publication: PublicationWithTopics;
}) {
  return (
    <article className="grid grid-cols-[76px_minmax(0,1fr)] gap-4 py-3.5 first:pt-1 sm:grid-cols-[86px_minmax(0,1fr)]">
      <Link
        href={`/publications/${publication.slug}`}
        className="mt-0.5 block self-start"
        aria-label={`Open ${publication.title}`}
      >
        <div className="relative h-[54px] w-[76px] overflow-hidden bg-white sm:h-[60px] sm:w-[86px]">
          <Image
            src={publication.image.src}
            alt={publication.image.alt}
            fill
            sizes="86px"
            className="object-contain"
          />
        </div>
      </Link>

      <div className="min-w-0">
        <h3 className="text-[14px] font-bold leading-[1.25] text-[#00677f] md:text-[15px]">
          <Link href={`/publications/${publication.slug}`} className="hover:underline">
            {publication.title}
          </Link>
        </h3>

        {publication.highlight && (
          <p className="mt-0.5 text-[12px] font-semibold leading-4 text-[#841617]">
            {publication.highlight}
          </p>
        )}

        <p className="mt-0.5 text-[13px] leading-[1.35] text-neutral-700">
          <AuthorsLine authors={publication.authors} />
        </p>

        <p className="mt-0.5 text-[13px] leading-[1.35] text-neutral-800">
          {publication.venue}
        </p>

        {publication.topics.length > 0 && (
          <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] leading-4 text-neutral-600">
            <span className="mr-0.5 text-[12px] text-neutral-700">Topics:</span>
            {publication.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-neutral-100 px-2 py-0.5"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <PublicationLinks publication={publication} />
      </div>
    </article>
  );
}
