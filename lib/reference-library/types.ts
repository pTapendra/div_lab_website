export type ReferencePaper = {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  keywords: string;
  link: string;
  bibtex: string;
  createdAt: string;
  updatedAt: string;
};

export type ReferencePaperInput = Omit<
  ReferencePaper,
  "id" | "createdAt" | "updatedAt"
>;
