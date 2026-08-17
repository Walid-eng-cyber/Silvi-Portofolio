import { assets } from './assets';

export type ProjectImage = {
  src: string;
  alt: string;
  /** Aspect ratio from the Figma frame (width / height). Drives height at every viewport. */
  ratio: string;
  /** Reproduces the crop window Figma applied inside the frame. */
  objectPosition?: string;
};

/**
 * A block of images beneath the info band. The detail frames use three shapes,
 * so the layout is described in data rather than hard-coded per project.
 */
export type MediaBlock =
  | { layout: 'pair'; images: ProjectImage[] }
  | { layout: 'full'; images: ProjectImage[] }
  | { layout: 'quad'; images: ProjectImage[] };

export type Project = {
  slug: string;
  /** Figma frame this page was built from. */
  figmaNode: string;
  /** Title line one — set in bold in the design. */
  titleLead: string;
  /** Title line two — set in regular weight. Not every frame has one. */
  titleTrail?: string;
  /** Short caption under the home-grid image. */
  caption: string;
  /** Disciplines listed in the left column of the info band. */
  disciplines: string[];
  /** The time figure printed under the disciplines. Absent on some frames. */
  effort?: string;
  /** Description paragraphs from the right column of the info band. */
  description: string[];
  /** Optional external link the design attaches to the project. */
  link?: { label: string; href: string };
  /** The wide plate directly under the title. */
  hero: ProjectImage;
  /** The image on the home grid — a different crop from the hero. */
  cover: ProjectImage;
  media: MediaBlock[];
};

export const projects: Project[] = [
  {
    slug: 'poster-in-typography',
    figmaNode: '7:23',
    titleLead: 'Poster in Typography for Literary Inspirations',
    caption: 'Poster design \u2014 typography',
    disciplines: ['Poster Design', 'Typography', 'Gradients', 'Printing'],
    // This frame lists no time figure.
    description: [
      'Poster Collection: Literary Inspirations in Typography and Color',
      'This personal poster series draws on literary quotes and sayings, combining soft gradients, vibrant colors, and typographic elements to create visually compelling designs. The latest work focuses on raising awareness of the Palestinian cause, featuring figures such as Rabindranath Tagore, a quote from The Bell Jar, and Edward Wadie Said.',
    ],
    hero: {
      src: assets.typographyHero,
      alt: 'Two typographic posters displayed on a wooden sideboard beside dried flowers',
      ratio: '552 / 458',
      objectPosition: '50% 100%',
    },
    cover: {
      src: assets.homePosters,
      alt: 'Typographic poster series displayed on a wooden sideboard beside dried flowers',
      ratio: '545 / 597',
    },
    media: [
      {
        layout: 'full',
        images: [
          {
            src: assets.typographyMockup,
            alt: 'Edward Wadie Said poster mounted in a street display case at night',
            ratio: '451 / 654',
          },
        ],
      },
    ],
  },
  {
    slug: 'rhythmic-gymnastics',
    figmaNode: '2:17',
    titleLead: 'Rhythmic Gymnastics World Championships',
    titleTrail: 'Frankfurt',
    caption: 'Corporate identity',
    disciplines: ['Corporate Identity'],
    effort: '336 h',
    description: [
      'I developed a corporate identity and logo redesign proposal for the Rhythmic Gymnastics World Championships, set in Frankfurt am Main in 2026.',
      'The project provided a valuable opportunity to experiment with visual storytelling and create a vibrant campaign celebrating female sport.',
      'The concept included social media content, posters, merchandise such as tote bags, and diverse advertising formats tailored for both horizontal and vertical layouts.',
    ],
    hero: {
      src: assets.gymHero,
      alt: 'Rhythmic Gymnastics World Championships billboard beside a motorway',
      ratio: '1144 / 469',
    },
    cover: {
      src: assets.homeGymnastics,
      alt: 'Rhythmic Gymnastics championship billboard beside a motorway',
      ratio: '1100 / 469',
    },
    media: [
      {
        layout: 'pair',
        images: [
          {
            src: assets.gymBillboards,
            alt: 'Two vertical championship posters mounted on a building facade',
            ratio: '556 / 657',
            objectPosition: '50% 50%',
          },
          {
            src: assets.gymLed,
            alt: 'Championship poster on an illuminated LED display',
            ratio: '542 / 657',
          },
        ],
      },
    ],
  },
  {
    slug: 'nature-inspired-poster',
    figmaNode: '2:35',
    titleLead: 'Nature-Inspired Poster',
    titleTrail: 'Vibrant City Series',
    caption: 'Poster design',
    disciplines: ['Poster Design', 'Communication'],
    effort: '336 h',
    description: [
      'This project is a series of posters inspired by plants. Each piece explores fluorescent color schemes and dynamic compositions, using overlapping shapes and playful contrasts to create a lively visual language.',
      'Though each poster features unique elements and forms, the series is unified through a consistent design technique\u2014layering, overlapping effects, and bold color combinations. The result is a cohesive collection that highlights the beauty of nature through a contemporary and colorful graphic approach.',
    ],
    hero: {
      src: assets.posterHero,
      alt: 'Four seasonal botanical posters shown side by side',
      ratio: '1097 / 376',
    },
    cover: {
      src: assets.posterHero,
      alt: 'Four seasonal botanical posters shown side by side',
      ratio: '1097 / 376',
    },
    media: [
      {
        layout: 'pair',
        images: [
          {
            src: assets.posterA,
            alt: 'Botanical poster shown in a room setting',
            ratio: '513 / 696',
          },
          {
            src: assets.posterB,
            alt: 'Botanical poster series shown at close range',
            ratio: '555 / 696',
            objectPosition: '50% 45%',
          },
        ],
      },
    ],
  },
  {
    slug: 'cetaphil',
    figmaNode: '2:756',
    titleLead: 'Cetaphil Digital Campaign',
    titleTrail: 'Social Media & Merch',
    caption: 'Campaign \u2014 social & merch',
    disciplines: ['Corporate Identity', 'Packaging', 'Branding', 'Social Media'],
    effort: '168 h',
    // NOTE: in the Figma frame this description is a copy of the poster
    // project's text and does not describe the Cetaphil work. Left verbatim —
    // it needs rewriting by Silvia, not invention here.
    description: [
      'This project is a series of posters inspired by plants. Each piece explores fluorescent color schemes and dynamic compositions, using overlapping shapes and playful contrasts to create a lively visual language.',
      'Though each poster features unique elements and forms, the series is unified through a consistent design technique\u2014layering, overlapping effects, and bold color combinations. The result is a cohesive collection that highlights the beauty of nature through a contemporary and colorful graphic approach.',
    ],
    hero: {
      src: assets.cetaphilHero,
      alt: 'Cetasphere campaign key visual',
      ratio: '1144 / 420',
      objectPosition: '50% 34%',
    },
    cover: {
      src: assets.cetaphilHero,
      alt: 'Cetasphere campaign key visual',
      ratio: '551 / 650',
      objectPosition: '50% 34%',
    },
    media: [
      {
        layout: 'pair',
        images: [
          {
            src: assets.cetaphilSlide,
            alt: 'Confidence Boosting Cleanser social media slide',
            ratio: '562 / 703',
          },
          {
            src: assets.cetaphilBox,
            alt: 'Cetaphil merchandise box with cap and products',
            ratio: '517 / 703',
            objectPosition: '48% 50%',
          },
        ],
      },
      {
        layout: 'full',
        images: [
          {
            src: assets.cetaphilPhone,
            alt: 'Campaign post shown on a phone in front of product packaging',
            ratio: '1100 / 791',
            objectPosition: '50% 38%',
          },
        ],
      },
    ],
  },
  {
    slug: 'bytes-and-garden',
    figmaNode: '2:787',
    titleLead: 'Bytes and Garden',
    titleTrail: 'Master Thesis Project',
    caption: 'Motion & exhibition design',
    disciplines: [
      'Motion Design',
      'Coding',
      'Exhibition Design',
      'Editorial Design',
    ],
    effort: '6 months',
    description: [
      'Bytes and Garden is my Master\u2019s project exploring how nature-inspired digital animations can enhance visitor engagement at the JGU Mainz Botanical Garden. By animating plants across the seasons using Cavalry software, the project demonstrated how digital media can seamlessly coexist with nature to create immersive, educational experiences.',
      'The project included a visual campaign and informational brochures designed to spark curiosity and support plant conservation, particularly among younger visitors.',
      'While the installation\u2019s full impact is still being evaluated, early feedback shows promising improvements in visitor interaction and appreciation. Bytes and Garden highlights new possibilities for botanical gardens and similar institutions to innovate through collaborations between design, science, and digital arts\u2014offering a forward-looking approach to enriching natural spaces with technology.',
    ],
    // The design hyperlinks the project name to a video walkthrough.
    link: {
      label: 'Watch the project film',
      href: 'https://www.dropbox.com/scl/fi/u7w3k0h5og9b4xwwgtj2a/BytesandGarden_SilviaCastilloAngulo.mp4?rlkey=irmxhulwqcse5qabmvzxv6u5o&st=c43w5ikn&dl=0',
    },
    hero: {
      src: assets.bytesHero,
      alt: 'Audience silhouetted against a glowing green plant installation',
      ratio: '1110 / 546',
      objectPosition: '50% 62%',
    },
    cover: {
      src: assets.homeInstallation,
      alt: 'Audience silhouetted against a glowing green installation',
      ratio: '1110 / 740',
    },
    media: [
      {
        layout: 'full',
        images: [
          {
            src: assets.bytesAutumn,
            alt: 'Autumn animation still from the installation',
            ratio: '749 / 425',
          },
        ],
      },
      {
        layout: 'quad',
        images: [
          {
            src: assets.bytesBrochure1,
            alt: 'Bytes and Garden brochure spread',
            ratio: '537 / 379',
          },
          {
            src: assets.bytesBrochure2,
            alt: 'Bytes and Garden brochure spread',
            ratio: '537 / 379',
          },
          {
            src: assets.bytesBrochure3,
            alt: 'Bytes and Garden brochure spread',
            ratio: '537 / 379',
          },
          {
            src: assets.bytesBrochure4,
            alt: 'Bytes and Garden brochure spread',
            ratio: '537 / 379',
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Wraps around, so the last project leads back to the first. */
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

/**
 * The A-List Festival key visual has no detail frame in the file, so it
 * renders as a plain image until a frame exists. The SILVI building wrap
 * shares its artwork with the Nature-Inspired Poster project and links there.
 */
export type GridEntry =
  | { kind: 'project'; slug: string }
  /**
   * An image with no detail frame. `href` sends it to an external page when one
   * exists, while `to` links to an internal route; without either the image is
   * not interactive.
   */
  | {
      kind: 'image';
      image: ProjectImage;
      caption: string;
      href?: string;
      to?: string;
    };

export const homeGrid: {
  rowA: GridEntry[];
  wideA: GridEntry;
  rowB: GridEntry[];
  wideB: GridEntry;
  wideC: GridEntry;
} = {
  rowA: [
    { kind: 'project', slug: 'poster-in-typography' },
    {
      kind: 'image',
      caption: 'Identity \u2014 environmental',
      to: '/work/nature-inspired-poster',
      image: {
        src: assets.homeBuilding,
        alt: 'SILVI wordmark as a large building wrap on a city facade',
        ratio: '547 / 597',
      },
    },
  ],
  wideA: { kind: 'project', slug: 'rhythmic-gymnastics' },
  rowB: [
    {
      kind: 'image',
      caption: 'Campaign \u2014 key visual',
      href: 'https://drumshedslondon.com/adobe/',
      image: {
        src: assets.homeFestival,
        alt: 'A-List Festival key visual with Adobe Express lock-up on blue',
        ratio: '549 / 650',
        objectPosition: '50% 44%',
      },
    },
    { kind: 'project', slug: 'cetaphil' },
  ],
  wideB: { kind: 'project', slug: 'bytes-and-garden' },
  /*
    The frame leaves ~1412px of empty canvas after the last image. Rather than
    reproduce dead space, the one project without a tile goes here — its
    landscape artwork suits the full-width slot.
  */
  wideC: { kind: 'project', slug: 'nature-inspired-poster' },
};
