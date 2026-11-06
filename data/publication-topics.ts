export const publicationTopicOrder = [
  "Perception",
  "Evaluation",
  "Design Optimization",
  "Comprehension",
  "Color Theory",
  "Line Charts and Scatter Plot",
  "Tool",
  "Empirical Study",
] as const;

export type PublicationTopic = (typeof publicationTopicOrder)[number];

export const publicationTopicsBySlug: Record<string, PublicationTopic[]> = {
  "title-framing-line-charts": ["Perception", "Comprehension", "Line Charts and Scatter Plot", "Empirical Study"],
  "guidelines-are-not-rules": ["Evaluation", "Design Optimization", "Empirical Study"],
  "hlc-llm": ["Evaluation", "Comprehension", "Empirical Study"],
  "human-mllm": ["Perception", "Evaluation", "Empirical Study"],
  "annotation-educator": ["Design Optimization", "Empirical Study"],
  "redundant-is-not-redundant": ["Perception", "Design Optimization", "Color Theory", "Tool"],
  "visual-stenography": ["Perception", "Line Charts and Scatter Plot", "Empirical Study"],
  "discrepancies-in-mental-workload": ["Perception", "Evaluation", "Empirical Study"],
  "evaluating-line-chart": ["Perception", "Evaluation", "Line Charts and Scatter Plot", "Empirical Study"],
  "visual-edugame": ["Design Optimization", "Evaluation"],
  "distortion-aware": ["Perception", "Design Optimization", "Tool", "Evaluation"],
  "understanding-bias": ["Perception", "Evaluation", "Empirical Study"],
  "subitizing-visualization": ["Perception", "Comprehension", "Evaluation", "Empirical Study"],
  "annotation-survey-2025": ["Evaluation", "Design Optimization"],
  "shape-it-up": ["Perception", "Design Optimization", "Tool", "Empirical Study"],
  "annotation-design-space": ["Design Optimization", "Empirical Study"],
  "evaluation-method-balance": ["Evaluation", "Empirical Study"],
  "our-stories-our-data": ["Design Optimization", "Empirical Study"],
  "annotation-barchart": ["Evaluation", "Empirical Study"],
  "task-design-optimized": ["Design Optimization"],
  "do-you-see-what-i-see": ["Perception", "Comprehension", "Evaluation", "Empirical Study"],
  "categorical-color-perception": ["Perception", "Color Theory", "Line Charts and Scatter Plot", "Empirical Study"],
  clams: ["Perception", "Evaluation", "Line Charts and Scatter Plot", "Tool"],
  "vlat-hlc-eduvis-2026": ["Evaluation", "Comprehension", "Empirical Study"],
};

export function getPublicationTopics(slug: string): PublicationTopic[] {
  return publicationTopicsBySlug[slug] ?? [];
}
