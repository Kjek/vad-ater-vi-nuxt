export interface TextStats {
  characters: number;
  words: number;
  lines: number;
  emptyLines: number;
  averageLineLength: number;
  uniqueLineRatio: number;
}

export function cleanWhitespace(text: string): string {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function getLines(text: string): string[] {
  return cleanWhitespace(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function getWords(text: string): string[] {
  return cleanWhitespace(text).split(/\s+/).filter(Boolean);
}

export function getTextStats(text: string): TextStats {
  const lines = getLines(text);
  const words = getWords(text);
  const uniqueLines = new Set(lines.map(normalizeForMatch));
  const totalLineLength = lines.reduce((sum, line) => sum + line.length, 0);

  return {
    characters: text.length,
    words: words.length,
    lines: lines.length,
    emptyLines: text.split('\n').filter((line) => !line.trim()).length,
    averageLineLength: lines.length ? totalLineLength / lines.length : 0,
    uniqueLineRatio: lines.length ? uniqueLines.size / lines.length : 0,
  };
}

export function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function removeDuplicateLines(text: string): string {
  const lines = getLines(text);
  const seen = new Set<string>();
  const result = lines.filter((line) => {
    const key = normalizeForMatch(line);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });

  return result.join('\n');
}

export function countOccurrences(text: string, pattern: RegExp): number {
  return (text.match(pattern) ?? []).length;
}

export function containsAny(text: string, values: string[]): boolean {
  const normalized = normalizeForMatch(text);

  return values.some((value) => normalized.includes(normalizeForMatch(value)));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + '...';
}

export function splitIntoBlocks(text: string): string[] {
  return cleanWhitespace(text)
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
}

export function calculateLineSimilarity(lines: string[]): number {
  if (lines.length < 2) {
    return 0;
  }

  const lengths = lines.map((line) => line.length);
  const average = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const similar = lengths.filter((length) => Math.abs(length - average) < average * 0.5);

  return similar.length / lines.length;
}
