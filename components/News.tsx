"use client";

import React from "react";
import newsData, { NewsLink } from "@/data/news";

function parseMonthYear(value: string): Date {
  const [mmRaw, yyyyRaw] = value.split(".").map((s) => s.trim());

  const month = Math.max((parseInt(mmRaw, 10) || 1) - 1, 0);
  const year = parseInt(yyyyRaw, 10) || 1970;

  return new Date(year, month, 1);
}

function renderContent(content: string, links?: NewsLink[]) {
  if (!links?.length) {
    return content;
  }

  let parts: React.ReactNode[] = [content];

  links.forEach((link) => {
    parts = parts.flatMap((part, index) => {
      if (typeof part !== "string") {
        return [part];
      }

      const split = part.split(link.label);

      if (split.length === 1) {
        return [part];
      }

      const result: React.ReactNode[] = [];

      split.forEach((text, splitIndex) => {
        if (text) {
          result.push(text);
        }

        if (splitIndex < split.length - 1) {
          result.push(
            <a
              key={`${link.href}-${index}-${splitIndex}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00677f] hover:underline"
            >
              {link.label}
            </a>
          );
        }
      });

      return result;
    });
  });

  return parts;
}

export default function News() {
  const sortedNews = [...newsData].sort(
    (a, b) => +parseMonthYear(b.date) - +parseMonthYear(a.date)
  );

  return (
    <section className="mt-6 rounded border border-neutral-200 bg-neutral-100 p-4 text-sm">
      <h2 className="mb-3 text-base font-semibold text-neutral-900">
        News and Updates
      </h2>

      <div className="max-h-52 overflow-y-auto pr-2">
        <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 gap-y-2">
          {sortedNews.map((news, index) => (
            <React.Fragment key={`${news.date}-${index}`}>
              <div className="whitespace-nowrap text-[0.8rem] font-medium text-neutral-900">
                {news.date}
              </div>

              <div
                className="truncate text-[0.8rem] text-neutral-600"
                title={news.content}
              >
                {renderContent(news.content, news.links)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}