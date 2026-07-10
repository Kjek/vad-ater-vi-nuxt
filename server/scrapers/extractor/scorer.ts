import type { CandidateElement } from './dom';

export interface ScoredCandidate {
  candidate: CandidateElement;
  score: number;
  signals: Record<string, number>;
}

export function scoreCandidates(candidates: CandidateElement[]): ScoredCandidate[] {
  return candidates
    .map((candidate) => {
      const signals = calculateSignals(candidate);

      const score = Object.values(signals).reduce((sum, value) => sum + value, 0);

      return {
        candidate,
        score,
        signals,
      };
    })
    .sort((a, b) => b.score - a.score);
}

function calculateSignals(candidate: CandidateElement): Record<string, number> {
  const text = candidate.text.toLowerCase();

  return {
    // Enough content
    textSize: scoreTextSize(candidate.textLength),

    // Menus are usually many lines
    lineStructure: scoreLineStructure(candidate.lineCount),

    // Menus have few links
    lowLinkDensity: scoreLinkDensity(candidate),

    // Prices are a strong menu signal
    prices: countPattern(text, /\d+\s?(kr|:-|sek)/) * 8,

    // Swedish/English weekday patterns
    // eslint-disable-next-line no-useless-escape
    dates: countPattern(text, /\b\d{1,2}[\/.-]\d{1,2}\b/) * 10,

    weekdays: countWeekdays(text) * 15,

    // Repeated item patterns
    repetition: scoreRepetition(candidate.text),

    // Headings often indicate sections
    headings: Math.min(candidate.headingCount * 3, 15),

    // Huge containers often include the whole page
    tooLarge: scorePageWrapper(candidate),
  };
}

function scoreTextSize(length: number) {
  if (length < 200) {
    return 0;
  }

  if (length < 1000) {
    return 10;
  }

  if (length < 5000) {
    return 20;
  }

  // Penalize entire pages
  return 5;
}

function scoreLineStructure(lines: number) {
  if (lines < 5) {
    return 0;
  }

  if (lines < 20) {
    return 10;
  }

  if (lines < 100) {
    return 20;
  }

  return 10;
}

function scoreLinkDensity(candidate: CandidateElement) {
  if (candidate.wordCount === 0) {
    return -20;
  }

  const ratio = candidate.linkCount / candidate.wordCount;

  if (ratio < 0.05) {
    return 15;
  }

  if (ratio < 0.15) {
    return 5;
  }

  return -20;
}

function countPattern(text: string, pattern: RegExp) {
  return (text.match(new RegExp(pattern, 'gi')) || []).length;
}

function countWeekdays(text: string) {
  const days = [
    'måndag',
    'tisdag',
    'onsdag',
    'torsdag',
    'fredag',
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];

  return days.filter((day) => text.includes(day)).length;
}

function scoreRepetition(text: string) {
  const lines = text
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);

  if (lines.length < 5) {
    return 0;
  }

  const lengths = lines.map((line) => line.length);
  const average = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const similar = lengths.filter((length) => Math.abs(length - average) < average * 0.5).length;

  if (similar / lengths.length > 0.5) {
    return 10;
  }

  return 0;
}

function scorePageWrapper(candidate: CandidateElement) {
  let score = 0;

  // Very deep elements are often wrappers
  if (candidate.depth > 10) {
    score -= 5;
  }

  // Too many images usually means hero/banner
  if (candidate.imageCount > 5) {
    score -= 10;
  }

  return score;
}
