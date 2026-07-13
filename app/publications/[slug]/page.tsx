import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { publications } from "@/data/publications";
import BibtexBox from "@/components/BibtexBox";


function AuthorsLine({
  authors,
}: {
  authors: (typeof publications)[number]["authors"]; 
}) {
  return (
    <>
      {authors.map((a, i) => {
        const sep =
          i === authors.length - 1
            ? ""
            : i === authors.length - 2
            ? " and "
            : ", ";
        const node = a.highlight ? (
          <strong key={a.name}>{a.name}</strong>
        ) : (
          <span key={a.name}>{a.name}</span>
        );
        return (
          <span key={`${a.name}-${i}`}>
            {node}
            {sep}
          </span>
        );
      })}
    </>
  );
}


export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) return notFound();

  const hero = pub.detail?.hero ?? pub.image;
  const pdfPrimary =
    pub.detail?.pdf ??
    pub.links.find((l) => ["PDF", "Preprint"].includes(l.label))?.href;

  return (
    <main className="main-content mx-4 md:mx-8 my-6 px-5 md:px-10 py-8 shadow-sm">
      <section className="pub-detail">
        <div className="w-full mb-5 max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-start">
            {pub.title}
          </h1>
          <div className="pub-meta mt-3 text-neutral-700 space-y-1">
            <p className="authors text-start">
              <AuthorsLine authors={pub.authors} />
            </p>
            <p className="venue text-start">{pub.venue}</p>
          </div>
        </div>

        <div className="pub-content flex flex-col items-center gap-8">
          {!!hero && (
            <div className="w-full max-w-6xl mx-auto">
              <Image
                src={hero.src}
                alt={hero.alt}
                width={1200}
                height={800}
                className="teaser-image block mx-auto rounded-lg shadow-sm w-full h-auto max-w-5xl"
                priority
              />
            </div>
          )}

          {pub.detail?.abstract && (
            <div className="pub-abstract w-full max-w-6xl bg-gray-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-2">Abstract</h2>
              <p className="leading-relaxed text-neutral-800 text-justify">
                {pub.detail.abstract}
              </p>
            </div>
          )}

          {pdfPrimary && (
            <div className="pub-resources w-full max-w-6xl">
              <h2 className="text-xl font-semibold mb-3">Resources</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={pdfPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-green-400 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  <Image
                    src="/icons/download.png"
                    alt="PDF"
                    width={20}
                    height={20}
                  />
                  PDF
                </Link>
              </div>
            </div>
          )}

          {pub.detail?.bibtex && (
            <div className="bibtex-content w-full max-w-6xl">
              <h3 className="text-lg font-semibold mb-2">Citation</h3>
              <BibtexBox bibtex={pub.detail.bibtex} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
