import type { CandidateElement } from './dom';

export interface CandidateOptions {
  minTextLength?: number;
  maxLinkRatio?: number;
  removeDuplicates?: boolean;
}

export function prepareCandidates(
  candidates: CandidateElement[],
  options: CandidateOptions = {}
): CandidateElement[] {
  const { minTextLength = 75, maxLinkRatio = 0.5, removeDuplicates = true } = options;

  let result = candidates.filter((candidate) => candidate.textLength >= minTextLength);

  result = result.filter((candidate) => {
    if (candidate.wordCount === 0) {
      return false;
    }

    const linkRatio = candidate.linkCount / candidate.wordCount;

    return linkRatio <= maxLinkRatio;
  });

  if (removeDuplicates) {
    result = removeDuplicateCandidates(result);
  }

  return result;
}

function removeDuplicateCandidates(candidates: CandidateElement[]): CandidateElement[] {
  const seen = new Set<string>();

  return candidates.filter((candidate) => {
    const normalized = normalizeText(candidate.text);

    if (seen.has(normalized)) {
      return false;
    }

    seen.add(normalized);

    return true;
  });
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}
