export function normalizeText(text: string): string {
  return (
    text
      // Normalize line endings
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')

      // Replace non-breaking spaces
      .replace(/\u00a0/g, ' ')

      // Normalize common typography
      .replace(/[“”]/g, '"')
      // eslint-disable-next-line @stylistic/quotes
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, '-')

      // Remove excessive spaces
      .replace(/[ \t]+/g, ' ')

      // Remove spaces before punctuation
      .replace(/\s+([,.!?;:])/g, '$1')

      // Keep meaningful line breaks
      .replace(/\n[ \t]+/g, '\n')

      // Remove excessive empty lines
      .replace(/\n{3,}/g, '\n\n')

      .trim()
  );
}

export function normalizeLine(line: string): string {
  return line
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

export function normalizeLines(text: string): string[] {
  return normalizeText(text).split('\n').map(normalizeLine).filter(Boolean);
}

export function normalizeForComparison(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function removeDuplicateLines(lines: string[]): string[] {
  const seen = new Set<string>();

  return lines.filter((line) => {
    const key = normalizeForComparison(line);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

export function cleanTextForScoring(text: string): string {
  return normalizeText(text).replace(/\s+/g, ' ').trim();
}
