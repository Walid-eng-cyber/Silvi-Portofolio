/**
 * Asset registry — the ONLY file that knows where images live.
 *
 * The URLs below are Figma's temporary MCP export links. They expire roughly
 * 7 days after export. To make the site permanent:
 *
 *   1. In Figma, select each node in `FIGMA_NODES` and export it (SVG for the
 *      wordmark, PNG or WebP at 2x for everything else).
 *   2. Drop the files into /public/images/ using the filenames in `LOCAL_PATHS`.
 *   3. Change `USE_LOCAL_ASSETS` to true.
 *
 * No other file in the project references an asset path.
 */

const USE_LOCAL_ASSETS = true;

/** Figma node ids, so every export can be traced back to the source design. */
export const FIGMA_NODES = {
  // Home — Desktop - 3 (0:3)
  wordmark: '0:18',
  homePosters: '0:8',
  homeBuilding: '0:19',
  homeGymnastics: '0:7',
  homeFestival: '0:21',
  homeCetaphil: '0:22',
  homeInstallation: '0:20',

  // 01-DETAIL PAGE (2:17) — Rhythmic Gymnastics
  gymHero: '2:22',
  gymBillboards: '2:29',
  gymLed: '2:28',

  // 01-DETAIL PAGE (7:23) — Poster in Typography
  typographyHero: '7:38',
  typographyMockup: '7:39',

  // 02-DETAIL PAGE (2:35) — Nature-Inspired Poster
  posterHero: '2:47',
  posterA: '2:45',
  posterB: '2:46',

  // 03-DETAIL PAGE (2:756) — Cetaphil
  cetaphilHero: '2:766',
  cetaphilSlide: '2:767',
  cetaphilBox: '2:768',
  cetaphilPhone: '2:769',

  // 04-DETAIL PAGE (2:787) — Bytes and Garden
  bytesHero: '2:797',
  bytesAutumn: '2:803',
  bytesBrochure1: '2:799',
  bytesBrochure2: '2:800',
  bytesBrochure3: '2:801',
  bytesBrochure4: '2:802',
} as const;

type AssetKey = keyof typeof FIGMA_NODES;

const REMOTE: Record<AssetKey, string> = {
  wordmark:
    'https://www.figma.com/api/mcp/asset/7540b697-2432-46f0-a401-29ce5e32229d.svg',
  homePosters:
    'https://www.figma.com/api/mcp/asset/1ef638ae-2ff0-4554-8a84-e43a32c6922c.png',
  homeBuilding:
    'https://www.figma.com/api/mcp/asset/ca285a05-d52c-4128-817a-bf20c43c1118.png',
  homeGymnastics:
    'https://www.figma.com/api/mcp/asset/4a4bc29f-846b-4a59-be7b-a7c1e7071942.png',
  homeFestival:
    'https://www.figma.com/api/mcp/asset/515585d5-3a69-4387-9bfe-5f5e0cbeed04.png',
  homeCetaphil:
    'https://www.figma.com/api/mcp/asset/51c20ba1-56a6-4135-a4f6-c706491fd297.png',
  homeInstallation:
    'https://www.figma.com/api/mcp/asset/3f21a01c-13b3-4b04-bbfa-586d5c536394.png',

  gymHero:
    'https://www.figma.com/api/mcp/asset/a7ecdfdc-07c8-44aa-9130-8db381a7e00b.png',
  gymBillboards:
    'https://www.figma.com/api/mcp/asset/a3157afb-add6-4e2d-9b45-2907bed314e5.png',
  gymLed:
    'https://www.figma.com/api/mcp/asset/e25ff7d1-2681-4fef-b469-8a224e383b14.png',

  typographyHero:
    'https://www.figma.com/api/mcp/asset/07b982dd-f7d7-4b89-b404-ee5ed3c94fea.png',
  typographyMockup:
    'https://www.figma.com/api/mcp/asset/b0d949ef-b224-4ee1-afb6-05cf3c7e8b35.png',

  posterHero:
    'https://www.figma.com/api/mcp/asset/74d71bd7-36fc-456d-888b-c83a62f20bcd.png',
  posterA:
    'https://www.figma.com/api/mcp/asset/be4d9e77-f6e9-4484-a237-856d94e70838.png',
  posterB:
    'https://www.figma.com/api/mcp/asset/7a12e37c-12e3-46b6-9501-1ae0f499907a.png',

  cetaphilHero:
    'https://www.figma.com/api/mcp/asset/46b4240b-8df9-4b19-b3e6-7a85af1d7acf.png',
  cetaphilSlide:
    'https://www.figma.com/api/mcp/asset/582205fc-03b8-44b0-9e14-2cf141f1f31d.png',
  cetaphilBox:
    'https://www.figma.com/api/mcp/asset/6b62889a-58b4-4b78-a984-99f16347c94e.png',
  cetaphilPhone:
    'https://www.figma.com/api/mcp/asset/34591296-e981-474b-83b2-2bc6b206812b.png',

  bytesHero:
    'https://www.figma.com/api/mcp/asset/f0197d76-cba3-443d-8477-097c09eec8a5.png',
  bytesAutumn:
    'https://www.figma.com/api/mcp/asset/782d4edd-ebfa-4046-b301-341c8d455751.png',
  bytesBrochure1:
    'https://www.figma.com/api/mcp/asset/aac69894-a55b-42f8-b2a9-b7ed236161d0.png',
  bytesBrochure2:
    'https://www.figma.com/api/mcp/asset/823145b0-e94e-4f3b-9c40-1b93006db304.png',
  bytesBrochure3:
    'https://www.figma.com/api/mcp/asset/c75ec39a-188b-4398-b926-c8f925943dba.png',
  bytesBrochure4:
    'https://www.figma.com/api/mcp/asset/565dd09b-c3e9-48dc-bb9b-51abbe8f52d1.png',
};

const LOCAL_PATHS: Record<AssetKey, string> = {
  wordmark: '/images/SILVI.svg',
  homePosters: '/images/home-posters.png',
  homeBuilding: '/images/home-building.png',
  homeGymnastics: '/images/home-gymnastics.png',
  homeFestival: '/images/home-festival.png',
  homeCetaphil: '/images/home-cetaphil.png',
  homeInstallation: '/images/home-installation.png',

  gymHero: '/images/gym-hero.png',
  gymBillboards: '/images/gym-billboards.png',
  gymLed: '/images/gym-led.png',

  typographyHero: '/images/typography-hero.png',
  typographyMockup: '/images/typography-mockup.png',

  posterHero: '/images/poster-hero.png',
  posterA: '/images/poster-a.png',
  posterB: '/images/poster-b.png',

  cetaphilHero: '/images/cetaphil-hero.png',
  cetaphilSlide: '/images/cetaphil-slide.png',
  cetaphilBox: '/images/cetaphil-box.png',
  cetaphilPhone: '/images/cetaphil-phone.png',

  bytesHero: '/images/bytes-hero.png',
  bytesAutumn: '/images/bytes-autumn.png',
  bytesBrochure1: '/images/bytes-brochure-1.png',
  bytesBrochure2: '/images/bytes-brochure-2.png',
  bytesBrochure3: '/images/bytes-brochure-3.png',
  bytesBrochure4: '/images/bytes-brochure-4.png',
};

export const assets: Record<AssetKey, string> = USE_LOCAL_ASSETS
  ? LOCAL_PATHS
  : REMOTE;
