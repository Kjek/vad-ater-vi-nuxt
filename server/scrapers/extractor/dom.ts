/// <reference lib="dom" />
/// <reference types="node" />
import type { Page } from 'playwright';

export interface CandidateElement {
  tag: string;
  id: string;
  classes: string[];
  text: string;
  textLength: number;
  lineCount: number;
  wordCount: number;
  linkCount: number;
  imageCount: number;
  headingCount: number;
  depth: number;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export async function extractDomCandidates(page: Page): Promise<CandidateElement[]> {
  return page.evaluate(() => {
    const selectors = ['main', 'article', 'section', 'div', 'aside'].join(',');
    const elements = Array.from(document.querySelectorAll(selectors));
    const candidates: CandidateElement[] = [];

    for (const element of elements) {
      const html = element as HTMLElement;
      const style = window.getComputedStyle(html);

      if (style.display === 'none' || style.visibility === 'hidden') {
        continue;
      }

      const rect = html.getBoundingClientRect();

      if (rect.width < 50 || rect.height < 30) {
        continue;
      }

      const text = html.innerText.replace(/\n{3,}/g, '\n\n').trim();

      if (text.length < 80) {
        continue;
      }

      const lineCount = text
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean).length;

      const wordCount = text.split(/\s+/).filter(Boolean).length;
      let depth = 0;
      let parent = html.parentElement;

      while (parent) {
        depth++;
        parent = parent.parentElement;
      }

      candidates.push({
        tag: html.tagName.toLowerCase(),
        id: html.id,
        classes: Array.from(html.classList),
        text,
        textLength: text.length,
        lineCount,
        wordCount,
        linkCount: html.querySelectorAll('a').length,
        imageCount: html.querySelectorAll('img').length,
        headingCount: html.querySelectorAll('h1,h2,h3,h4,h5,h6').length,
        depth,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
      });
    }

    return candidates;
  });
}
