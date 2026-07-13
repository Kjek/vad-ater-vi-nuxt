import type { LunchMenu } from '~/types/lunch-menu';
import type Scraper from '../types/scraper';
import { fetchPage } from './crawler';
import { extractDomCandidates } from './extractor/dom';
import { prepareCandidates } from './extractor/candidates';
import { scoreCandidates } from './extractor/scorer';
import { parseMenu } from './extractor/parser';

const genericWebScraper: Scraper = async (lunchUrl, debug) => {
  console.time(`Generic scraper for ${lunchUrl}`);

  const crawled = await fetchPage(lunchUrl);
  const domCandidates = await extractDomCandidates(crawled.page);
  await crawled.browser.close();
  const candidates = prepareCandidates(domCandidates);
  const scored = scoreCandidates(candidates);
  const best = scored[0];

  if (!best) {
    throw new Error('No menu candidate found');
  }

  const menu = await parseMenu(best.candidate.text);

  const lunchMenu = menu.days.map((data) => {
    return {
      day: data.day,
      food: data.dishes.flatMap((dish) => dish.name).join('\n'),
    } as LunchMenu;
  });

  console.timeEnd(`Generic scraper for ${lunchUrl}`);
  if (debug) {
    console.log(`[SCRAPER DEBUG] [Lunch Menu] ${lunchMenu}`);
    return lunchMenu ?? JSON.stringify('404 No lunch menu found');
  }

  return lunchMenu;
};

export default genericWebScraper;
