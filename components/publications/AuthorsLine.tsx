import type { Publication } from "@/data/publications";

export default function AuthorsLine({
  authors,
}: {
  authors: Publication["authors"];
}) {
  return (
    <>
      {authors.map((author, index) => {
        const separator =
          index === authors.length - 1
            ? ""
            : index === authors.length - 2
              ? " and "
              : ", ";

        return (
          <span key={`${author.name}-${index}`}>
            {author.highlight ? (
              <strong>{author.name}</strong>
            ) : (
              author.name
            )}
            {separator}
          </span>
        );
      })}
    </>
  );
}
