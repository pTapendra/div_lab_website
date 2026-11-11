"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  publicationTopicOrder,
  type PublicationTopic,
} from "@/data/publication-topics";

import type {
  PublicationWithTopics,
} from "./publication-utils";

const CELL = 20;
const COUNT_WIDTH = 36;
const HEADER_HEIGHT = 145;
const MAX_BAR_HEIGHT = 110;

type Props = {
  publications: PublicationWithTopics[];

  selectedSlugs: string[] | null;

  onSelectionChange: (
    slugs: string[] | null
  ) => void;

  onPreviewChange: (
    slugs: string[] | null
  ) => void;
};

export default function UpSetFilter({
  publications,
  selectedSlugs,
  onSelectionChange,
  onPreviewChange,
}: Props) {
  const [
    hoveredRow,
    setHoveredRow,
  ] = useState<string | null>(null);

  const [
    hoveredTopic,
    setHoveredTopic,
  ] = useState<PublicationTopic | null>(
    null
  );

  /*
   * Group every publication exactly once.
   * A row is one exact combination of topics.
   */
  const rows = useMemo(() => {
    const groups = new Map<
      string,
      {
        topics: PublicationTopic[];
        slugs: string[];
      }
    >();

    for (const publication of publications) {
      // Use only displayed topics, in column order.
      const topics = publicationTopicOrder.filter((topic) =>
        publication.topics.includes(topic)
      );
      const key = topics.join("|") || "__uncategorized__";
      const group = groups.get(key);

      if (group) {
        group.slugs.push(publication.slug);
      } else {
        groups.set(key, {
          topics,
          slugs: [publication.slug],
        });
      }
    }

    return Array.from(groups, ([key, group]) => ({
      key,
      topics: group.topics,
      slugs: group.slugs,
      count: group.slugs.length,
    })).sort((a, b) => b.count - a.count);
  }, [publications]);

  /*
   * Column counts come from the same exact rows.
   * This keeps row/column counts consistent.
   */
  const topicData = useMemo(() => {
    return publicationTopicOrder.map((topic) => {
      const matchingRows = rows.filter((row) =>
        row.topics.includes(topic)
      );

      return {
        topic,
        slugs: matchingRows.flatMap((row) => row.slugs),
        count: matchingRows.reduce((sum, row) => sum + row.count, 0),
        dotCount: matchingRows.length,
      };
    });
  }, [rows]);

  // A paper without any of the eight topics still counts as a paper.
  const uncategorizedCount =
    rows.find((row) => row.key === "__uncategorized__")?.count ?? 0;

  const maxTopicCount = useMemo(
    () =>
      Math.max(
        1,
        ...topicData.map(
          (item) => item.count
        )
      ),
    [topicData]
  );

  /*
   * Compare filter sets.
   */
  function sameSlugs(
    first: string[] | null,
    second: string[]
  ) {
    if (!first) {
      return false;
    }

    if (
      first.length !== second.length
    ) {
      return false;
    }

    return second.every((slug) =>
      first.includes(slug)
    );
  }

  /*
   * Preview intersection.
   */
  function previewRow(
    key: string,
    slugs: string[]
  ) {
    setHoveredRow(key);

    onPreviewChange(slugs);
  }

  /*
   * End row preview.
   */
  function leaveRow() {
    setHoveredRow(null);

    onPreviewChange(null);
  }

  /*
   * Preview topic.
   */
  function previewTopic(
    topic: PublicationTopic,
    slugs: string[]
  ) {
    setHoveredTopic(topic);

    onPreviewChange(slugs);
  }

  /*
   * End topic preview.
   */
  function leaveTopic() {
    setHoveredTopic(null);

    onPreviewChange(null);
  }

  /*
   * Lock/unlock filter.
   */
  function toggleSelection(
    slugs: string[]
  ) {
    if (
      sameSlugs(
        selectedSlugs,
        slugs
      )
    ) {
      onSelectionChange(null);
    } else {
      onSelectionChange(slugs);
    }
  }

  /*
   * Clear everything.
   */
  function clearFilter() {
    setHoveredRow(null);
    setHoveredTopic(null);

    onPreviewChange(null);
    onSelectionChange(null);
  }

  return (
    <aside className="lg:sticky lg:top-5 lg:self-start">
      <div className="mb-3">
        <h2 className="text-sm font-bold text-neutral-900">
          Topic intersections
        </h2>

        <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">
          Hover to preview. Click to
          keep a filter.
        </p>

        <p className="mt-1 text-[10px] text-neutral-500">
          {publications.length} publications · {rows.length} exact intersections
        </p>
      </div>

      <div className="overflow-x-auto">
        <div
          className="min-w-max"
          style={{
            width:
              publicationTopicOrder.length *
              CELL +
              COUNT_WIDTH,
          }}
        >
          {/* Topic bars */}
          <div
            className="grid items-end"
            style={{
              gridTemplateColumns: `${publicationTopicOrder.length *
                CELL
                }px ${COUNT_WIDTH}px`,
            }}
          >
            <div
              className="grid items-end"
              style={{
                height: HEADER_HEIGHT,

                gridTemplateColumns: `repeat(${publicationTopicOrder.length}, ${CELL}px)`,
              }}
            >
              {topicData.map(
                ({
                  topic,
                  slugs,
                  count,
                }) => {
                  const hovered =
                    hoveredTopic === topic;

                  const selected =
                    sameSlugs(
                      selectedSlugs,
                      slugs
                    );

                  const barHeight =
                    count === 0
                      ? 0
                      : Math.max(
                        10,
                        (count /
                          maxTopicCount) *
                        MAX_BAR_HEIGHT
                      );

                  return (
                    <button
                      key={topic}
                      type="button"
                      onMouseEnter={() =>
                        previewTopic(
                          topic,
                          slugs
                        )
                      }
                      onMouseLeave={
                        leaveTopic
                      }
                      onClick={() =>
                        toggleSelection(
                          slugs
                        )
                      }
                      className="relative flex h-full cursor-pointer items-end justify-center"
                      title={`${topic} — ${count} publication${count === 1
                        ? ""
                        : "s"
                        }`}
                    >
                      {/* Size bar */}
                      <span
                        className={`absolute bottom-0 left-[1px] right-[1px] transition-colors duration-100 ${selected
                          ? "bg-sky-200"
                          : hovered
                            ? "bg-sky-100"
                            : "bg-[#d8dde4]"
                          }`}
                        style={{
                          height:
                            barHeight,
                        }}
                      />

                      {/* Vertical text */}
                      <span
                        className={`relative z-10 mb-1 whitespace-nowrap text-[9px] font-medium transition-colors ${hovered ||
                          selected
                          ? "text-[#00677f]"
                          : "text-neutral-700"
                          }`}
                        style={{
                          writingMode:
                            "vertical-rl",

                          transform:
                            "rotate(180deg)",
                        }}
                      >
                        {topic}
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            <div />
          </div>

          {/* Intersection matrix */}
          <div className="border-t border-neutral-300 pt-1">
            {rows.map((row) => {
              const selected =
                sameSlugs(
                  selectedSlugs,
                  row.slugs
                );

              const hovered =
                hoveredRow === row.key;

              const activeIndexes =
                publicationTopicOrder
                  .map(
                    (
                      topic,
                      index
                    ) =>
                      row.topics.includes(
                        topic
                      )
                        ? index
                        : -1
                  )
                  .filter(
                    (index) =>
                      index >= 0
                  );

              const firstIndex =
                activeIndexes[0] ?? 0;

              const lastIndex =
                activeIndexes[
                activeIndexes.length -
                1
                ] ?? firstIndex;

              return (
                <button
                  type="button"
                  key={row.key}
                  onMouseEnter={() =>
                    previewRow(
                      row.key,
                      row.slugs
                    )
                  }
                  onMouseLeave={
                    leaveRow
                  }
                  onClick={() =>
                    toggleSelection(
                      row.slugs
                    )
                  }
                  className={`grid w-full cursor-pointer items-center py-[3px] text-left transition-colors duration-100 ${selected
                    ? "bg-sky-100"
                    : hovered
                      ? "bg-sky-50"
                      : ""
                    }`}
                  style={{
                    gridTemplateColumns: `${publicationTopicOrder.length *
                      CELL
                      }px ${COUNT_WIDTH}px`,
                  }}
                  title={`${row.topics.length ? row.topics.join(
                    ", "
                  ) : "Uncategorized (no assigned UpSet topic)"} — ${row.count
                    } publication${row.count === 1
                      ? ""
                      : "s"
                    }`}
                >
                  <div
                    className="relative grid h-[18px]"
                    style={{
                      gridTemplateColumns: `repeat(${publicationTopicOrder.length}, ${CELL}px)`,
                    }}
                  >
                    {/* Connecting line */}
                    {activeIndexes.length >
                      1 && (
                        <span
                          className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-[#9aa8b8]"
                          style={{
                            left:
                              firstIndex *
                              CELL +
                              CELL / 2,

                            width:
                              (lastIndex -
                                firstIndex) *
                              CELL,
                          }}
                        />
                      )}

                    {/* Explain papers without assigned topics */}
                    {row.topics.length === 0 && (
                      <span className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 text-[9px] text-neutral-500">
                        Uncategorized
                      </span>
                    )}

                    {/* Dots */}
                    {publicationTopicOrder.map(
                      (topic) => {
                        const active =
                          row.topics.includes(
                            topic
                          );

                        return (
                          <span
                            key={topic}
                            className="relative z-10 flex items-center justify-center"
                          >
                            <span
                              className={`h-[13px] w-[13px] rounded-full ${active
                                ? "bg-[#9aa8b8]"
                                : "bg-[#eef0f3]"
                                }`}
                            />
                          </span>
                        );
                      }
                    )}
                  </div>

                  {/* Count */}
                  <span
                    className={`ml-1 flex h-[20px] items-center justify-center text-[10px] font-medium ${selected
                      ? "bg-[#9aa8b8] text-white"
                      : hovered
                        ? "bg-[#cfd6df] text-neutral-800"
                        : "bg-[#d8dde4] text-neutral-700"
                      }`}
                    title={`${row.topics.length} filled dot${row.topics.length === 1 ? "" : "s"
                      }`}
                  >
                    {row.topics.length}
                  </span>
                </button>
              );
            })}

            {/* Boxed column totals; one box per topic */}
            <div
              className="mt-1 grid border-t border-neutral-300 pt-1"
              style={{
                gridTemplateColumns: `${publicationTopicOrder.length * CELL
                  }px ${COUNT_WIDTH}px`,
              }}
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${publicationTopicOrder.length}, ${CELL}px)`,
                }}
              >
                {topicData.map(({ topic, slugs, dotCount }) => {
                  const hovered = hoveredTopic === topic;
                  const selected = sameSlugs(selectedSlugs, slugs);

                  return (
                    <span
                      key={topic}
                      className={`mx-[1px] flex h-[20px] items-center justify-center text-[10px] font-medium ${selected
                        ? "bg-[#9aa8b8] text-white"
                        : hovered
                          ? "bg-[#cfd6df] text-neutral-800"
                          : "bg-[#d8dde4] text-neutral-700"
                        }`}
                      title={`${topic} — ${dotCount} filled dot${dotCount === 1 ? "" : "s"
                        }`}
                    >
                      {dotCount}
                    </span>
                  );
                })}
              </div>
              <div />
            </div>

            {uncategorizedCount > 0 && (
              <p className="mt-2 text-[10px] leading-4 text-neutral-600">
                {uncategorizedCount} publication{uncategorizedCount === 1 ? "" : "s"}
                {" "}without an UpSet topic. Assign topics in
                {" "}<code>data/publication-topics.ts</code> to include them in column totals.
              </p>
            )}
          </div>

          {/* Clear */}
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={
                clearFilter
              }
              className="text-[12px] text-neutral-700 hover:text-[#00677f] hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}