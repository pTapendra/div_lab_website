"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  extractCombinations,
} from "@upsetjs/bundle";

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
   * Exact intersections.
   */
  const rows = useMemo(() => {
    const { combinations } =
      extractCombinations(
        publications,

        (publication) => [
          ...publication.topics,
        ],

        {
          type: "distinctIntersection",
        }
      );

    return combinations
      .filter(
        (combination) =>
          combination.elems.length > 0
      )
      .map((combination) => {
        const firstPaper =
          combination.elems[0];

        const topics =
          firstPaper?.topics ?? [];

        const slugs =
          combination.elems.map(
            (publication) =>
              publication.slug
          );

        return {
          key: [...topics]
            .sort()
            .join("|"),

          topics,
          slugs,

          count:
            combination.elems.length,
        };
      })
      .sort(
        (a, b) =>
          b.count - a.count
      );
  }, [publications]);

  /*
   * Topic → publications.
   */
  const topicData = useMemo(() => {
    return publicationTopicOrder.map(
      (topic) => {
        const matching =
          publications.filter(
            (publication) =>
              publication.topics.includes(
                topic
              )
          );

        return {
          topic,

          slugs: matching.map(
            (publication) =>
              publication.slug
          ),

          count: matching.length,
        };
      }
    );
  }, [publications]);

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
              gridTemplateColumns: `${
                publicationTopicOrder.length *
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
                      title={`${topic} — ${count} publication${
                        count === 1
                          ? ""
                          : "s"
                      }`}
                    >
                      {/* Size bar */}
                      <span
                        className={`absolute bottom-0 left-[1px] right-[1px] transition-colors duration-100 ${
                          selected
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
                        className={`relative z-10 mb-1 whitespace-nowrap text-[9px] font-medium transition-colors ${
                          hovered ||
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
                  className={`grid w-full cursor-pointer items-center py-[3px] text-left transition-colors duration-100 ${
                    selected
                      ? "bg-sky-100"
                      : hovered
                        ? "bg-sky-50"
                        : ""
                  }`}
                  style={{
                    gridTemplateColumns: `${
                      publicationTopicOrder.length *
                      CELL
                    }px ${COUNT_WIDTH}px`,
                  }}
                  title={`${row.topics.join(
                    ", "
                  )} — ${
                    row.count
                  } publication${
                    row.count === 1
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
                              className={`h-[13px] w-[13px] rounded-full ${
                                active
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
                    className={`ml-1 flex h-[20px] items-center justify-center text-[10px] font-medium ${
                      selected
                        ? "bg-[#9aa8b8] text-white"
                        : hovered
                          ? "bg-[#cfd6df] text-neutral-800"
                          : "bg-[#d8dde4] text-neutral-700"
                    }`}
                  >
                    {row.count}
                  </span>
                </button>
              );
            })}
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