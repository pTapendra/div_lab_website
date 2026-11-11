
export type NewsLink = {
  label: string;
  href: string;
};

export type NewsRecord = {
  date: string;
  content: string;
  links?: NewsLink[];
};

export const newsData: NewsRecord[] = [
  {
    date: "11.2026",
    content:
      "DIV-Lab member- Aaryani, Ghulam, and Tapendra travelling to Boston for IEEE VIS 2026. See you there !",
  },
  {
    date: "10.2026",
    content:
      "Abstract accepted for VisXVision workshop Lightning Talk at IEEE VIS 2026.",
    links: [
      {
        label: "VisXVision",
        href: "https://visxvision.com/vis-2026/",
      },
    ],
  },
  {
    date: "08.2026",
    content:
      "Workshop papers and Poster IEEE VIS 2026: VLAT-HLC paper at EduVIS, Title Framing paper at VisXVision, and Quick-View Takeaways poster.",
    links: [
      {
        label: "EduVIS",
        href: "https://ieee-eduvis.github.io/",
      },
      {
        label: "Title Framing",
        href: "https://arxiv.org/abs/2609.17455",
      },
      {
        label: "Quick-View Takeaways",
        href: "https://arxiv.org/abs/2609.17485",
      },
    ],
  },
  {
    date: "06.2026",
    content:
      "Debra successfully defended her Ph.D. Congratulations to Dr. Debra Hogue!",
  },
  {
    date: "05.2026",
    content:
      "Abstract accepted at VisXVision satellite event at VSS 2026",
  },
  {
    date: "05.2026",
    content:
      "Aaryani Chowdary Ambati joins DIV-Lab as a PhD student.",
  },
  {
    date: "04.2026",
    content:
      "Jasmine Lim received a Summer UReCA Fellowship. A paper accepted at EuroVis 2026.",
    links: [
      {
        label: "Summer UReCA Fellowship",
        href: "https://www.ou.edu/ureca/opportunities/ureca-summer-fellowship",
      },
      {
        label: "EuroVis 2026",
        href: "https://arxiv.org/abs/2604.08959",
      },
    ],
  },
  {
    date: "04.2026",
    content:
      "CatPAW received an ACM CHI 2026 Honorable Mention.",
    links: [
      {
        label: "ACM CHI 2026 Honorable Mention",
        href: "https://arxiv.org/abs/2602.06792",
      },
    ],
  },
  {
    date: "10.2025",
    content:
      "Subitizing paper received an IEEE VIS 2025 Honorable Mention;",
    links: [
      {
        label: "IEEE VIS 2025 Honorable Mention",
        href: "https://ieeevis.org/year/2025/info/awards/best-paper-awards",
      },
    ],
  },
  {
    date: "10.2025",
    content:
      "Visual Stenography paper accepted at IEEE TVCG 2025.",
    links: [
      {
        label: "Visual Stenography",
        href: "https://arxiv.org/abs/2510.11927",
      },
    ],
  },
  {
    date: "09.2025",
    content:
      "Distortion-aware Brushing accepted at IEEE TVCG;",
    links: [
      {
        label: "Distortion-aware Brushing",
        href: "https://arxiv.org/abs/2201.06379",
      },
    ],
  },
  {
    date: "09.2025",
    content:
      "Evaluating Line Chart Strategies accepted at ISVC 2025.",
    links: [
      {
        label: "Evaluating Line Chart Strategies",
        href: "https://arxiv.org/abs/2510.11912",
      },
    ],
  },
  {
    date: "07.2025",
    content:
      "Subitizing was accepted at IEEE VIS 2025. Annotations survey work accepted at IEEE TVCG 2025.",
    links: [
      {
        label: "Subitizing",
        href: "https://arxiv.org/pdf/2410.05579",
      },
      {
        label: "Annotations Survey",
        href: "https://arxiv.org/pdf/2410.05579",
      },
    ],
  },
  {
    date: "06.2025",
    content:
      'Co-Organized the Dagstuhl Seminar "Navigating the Maze of Guidelines to Unify Visualization Design Recommendations."',
    links: [
      {
        label: "Dagstuhl Seminar",
        href: "https://www.dagstuhl.de/en/seminars/seminar-calendar/seminar-details/25232",
      },
    ],
  },
  {
    date: "04.2025",
    content:
      "High-Level Visualization Comprehension and Categorical Color Perception papers accepted at ACM CHI and EuroVis.",
    links: [
      {
        label: "High-Level Visualization Comprehension",
        href: "https://doi.org/10.1145/3613904.3642813",
      },
      {
        label: "Categorical Color Perception",
        href: "https://arxiv.org/pdf/2404.03787",
      },
    ],
  },
  {
    date: "09.2024",
    content:
      "IEEE VIS 2024- A Panel Discussion proposal accepted. A paper accepted at BELIV workshop",
    links: [
      {
        label: "IEEE VIS Panel",
        href: "https://vis-panel-enough-evaluation.github.io/",
      },
      {
        label: "BELIV Workshop",
        href: "https://arxiv.org/pdf/2408.16080",
      },
    ],
  },
  {
    date: "08.2024",
    content:
      "Annotation Design Space and Shape It Up papers accepted at IEEE VIS 2024.",
    links: [
      {
        label: "Annotation Design Space",
        href: "https://arxiv.org/pdf/2306.06043",
      },
      {
        label: "Shape It Up",
        href: "https://arxiv.org/pdf/2408.16079",
      },
    ],
  },
  {
    date: "07.2024",
    content:
      "Paper was accepted at ACM ASSETS 2024.",
    links: [
      {
        label: "Our Stories, Our Data",
        href: "https://www.arxiv.org/pdf/2408.16072",
      },
    ],
  },
  {
    date: "05.2024",
    content:
      "Categorical Color Perception work received the Best Short Paper Award at EuroVis 2024.",
    links: [
      {
        label: "EuroVis 2024 Best Short Paper",
        href: "https://event.sdu.dk/eurovis/awards",
      },
    ],
  },
];

export default newsData;
