export interface DetectedDate {
  day?: string;
  date?: string;
  week?: string;
}

const WEEKDAYS = [
  {
    name: 'Måndag',
    patterns: [/m[åa]ndag/i, /monday/i],
  },
  {
    name: 'Tisdag',
    patterns: [/tisdag/i, /tuesday/i],
  },
  {
    name: 'Onsdag',
    patterns: [/onsdag/i, /wednesday/i],
  },
  {
    name: 'Torsdag',
    patterns: [/torsdag/i, /thursday/i],
  },
  {
    name: 'Fredag',
    patterns: [/fredag/i, /friday/i],
  },
  {
    name: 'Lördag',
    patterns: [/l[öo]rdag/i, /saturday/i],
  },
  {
    name: 'Söndag',
    patterns: [/s[öo]ndag/i, /sunday/i],
  },
];

export function detectWeekday(text: string): string | null {
  for (const day of WEEKDAYS) {
    for (const pattern of day.patterns) {
      if (pattern.test(text)) {
        return day.name;
      }
    }
  }

  return null;
}

export function extractDate(text: string): string | null {
  const patterns = [
    // 6/7
    /\b\d{1,2}\/\d{1,2}\b/,

    // 06-07
    /\b\d{1,2}-\d{1,2}\b/,

    // 06.07
    /\b\d{1,2}\.\d{1,2}\b/,

    // 2026-07-06
    /\b\d{4}-\d{1,2}-\d{1,2}\b/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return match[0];
    }
  }

  return null;
}

export function extractWeek(text: string): string | null {
  const patterns = [/vecka\s*(\d{1,2})/i, /week\s*(\d{1,2})/i, /\bv\.\s*(\d{1,2})/i];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return match[1];
    }
  }

  return null;
}

export function detectDates(text: string): DetectedDate {
  return {
    day: detectWeekday(text) ?? undefined,

    date: extractDate(text) ?? undefined,

    week: extractWeek(text) ?? undefined,
  };
}

export function countDateSignals(text: string): number {
  let score = 0;

  if (detectWeekday(text)) {
    score += 1;
  }

  if (extractDate(text)) {
    score += 1;
  }

  if (extractWeek(text)) {
    score += 1;
  }

  return score;
}

export function isDateLine(line: string): boolean {
  return Boolean(detectWeekday(line) || extractDate(line));
}
