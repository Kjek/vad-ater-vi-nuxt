import { getConfiguration } from '~~/server/helpers/admin-db-helper';

/* eslint-disable @stylistic/indent-binary-ops */
export interface ParsedDish {
  name: string;
  price?: string;
}

export interface ParsedDay {
  day: string | null;
  date: string | null;
  dishes: ParsedDish[];
}

export interface ParsedMenu {
  days: ParsedDay[];
  raw: string;
}

interface Section {
  day: string | null;
  date: string | null;
  text: string;
}

const DAY_PATTERNS = [
  {
    name: 'Måndag',
    regex: /\bm[åa]ndag\b/i,
  },
  {
    name: 'Tisdag',
    regex: /\btisdag\b/i,
  },
  {
    name: 'Onsdag',
    regex: /\bonsdag\b/i,
  },
  {
    name: 'Torsdag',
    regex: /\btorsdag\b/i,
  },
  {
    name: 'Fredag',
    regex: /\bfredag\b/i,
  },
  {
    name: 'Lördag',
    regex: /\bl[öo]rdag\b/i,
  },
  {
    name: 'Söndag',
    regex: /\bs[öo]ndag\b/i,
  },
];

const IGNORE_DEFAULT = [
  'inkl',
  'inklusive',
  'serveras',
  'öppettider',
  'kontakt',
  'telefon',
  'boka',
  'välkommen',
  'hotell',
  'buss',
  'kvinna',
  'bröllop',
  'www',
  '@',
  'sms',
  'personal',
  'förfrågan',
  'onödig',
  'ödmjuk',
  'uppgift',
  'resa',
  '...',
];

export async function parseMenu(text: string): Promise<ParsedMenu> {
  const configuration = await getConfiguration('ignored-metadata');
  const ignore = (configuration?.value as string[]) ?? IGNORE_DEFAULT;

  const cleaned = normalizeText(text);
  const sections = splitByDays(cleaned) ?? [];
  const days = sections.map((section) => parseDay(section, ignore));

  return {
    days,
    raw: text,
  };
}

function splitByDays(text: string) {
  const matches = [...text.matchAll(buildDayRegex())];

  if (matches.length === 0) {
    return [
      {
        day: null,
        date: null,
        text,
      },
    ];
  }

  const sections: Section[] = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (!match) {
      return;
    }
    const start = match.index;
    const end = matches[i + 1]?.index ?? text.length;

    sections.push({
      day: toSentenceCase(match[1]),
      date: extractDate(match[0]),
      text: text.substring(start + match[0].length, end),
    } as Section);
  }

  return sections;
}

function parseDay(section: Section, ignore: string[]): ParsedDay {
  const lines = section.text
    .split('\n')
    .map((line: string) => line.replace(/^\*/i, '').trim())
    .filter(Boolean);

  const dishes = lines.filter((line) => isDishLine(line, ignore)).map(parseDish);
  console.log(dishes);

  return {
    day: section.day ?? null,
    date: section.date ?? null,
    dishes,
  };
}

function parseDish(line: string): ParsedDish {
  const price = extractPrice(line);

  return {
    name: removePrice(line).trim(),
    ...(price ? { price } : {}),
  };
}

function isDishLine(line: string, ignore: string[]) {
  const lower = line.toLowerCase();

  if (ignore.some((word) => lower.includes(word))) {
    return false;
  }

  // Too short to be food
  if (line.length < 5) {
    return false;
  }

  return true;
}

function extractPrice(text: string) {
  const match = text.match(/\d+\s?(kr|:-|sek)/i);

  return match?.[0];
}

function removePrice(text: string) {
  return text.replace(/\d+\s?(kr|:-|sek)/gi, '');
}

function extractDate(text: string) {
  const match = text.match(/\d{1,2}[/.-]\d{1,2}/);

  return match?.[0] ?? null;
}

function buildDayRegex() {
  return new RegExp(
    '(' +
      DAY_PATTERNS.map((x) => x.regex.source).join('|') +
      ')' +
      '(?:\\s+\\d{1,2}[\\/.-]\\d{1,2})?',
    'gi'
  );
}

function normalizeText(text: string) {
  return text
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
