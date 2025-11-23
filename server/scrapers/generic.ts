/// <reference lib="dom" />
/// <reference types="node" />

import { parseHTML } from 'linkedom';
import type { LunchMenu, WeeklySpecial } from '~/types/lunch-menu';
import { sweDays } from '~/types/swedish-days';
import type Scraper from '../types/scraper';
import { removeDuplicatesWithKey } from '../utils/array-utils';
import { decodeHtmlEntity } from '../utils/html-utils';

const genericWebScraper: Scraper = async (lunchUrl, lunchRegex, weeklyRegex, debug) => {
  console.time(`Generic scraper for ${lunchUrl}`);
  const response = await fetch(lunchUrl, {
    headers: {
      'Accept-Encoding': 'gzip',
    },
  });
  if (!response.ok) {
    console.timeEnd(`Generic scraper for ${lunchUrl}`);
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const html = await response.text();
  const { document } = parseHTML(html);
  const searchRegex = /^\s*(?:Tisdag|Tis|Torsdag|Tors)(?!\w|\s*\d+:|:\s*\d+:)/gim;
  const lunchMenu = (
    Array.from(document.querySelectorAll('div'))
      .filter(({ innerText }) => innerText && searchRegex.test(innerText))
      .map(({ innerText }) => innerText)[0] ??
    Array.from(document.querySelectorAll('strong'))
      .filter(({ innerText }) => innerText && searchRegex.test(innerText))
      .map(({ innerText }) => innerText)[0] ??
    Array.from(document.querySelectorAll('p'))
      .filter(({ innerText }) => innerText && searchRegex.test(innerText))
      .map(({ innerText }) => innerText)[0] ??
    Array.from(document.querySelectorAll('ul'))
      .filter(({ innerText }) => innerText && searchRegex.test(innerText))
      .map(({ innerText }) => innerText)[0] ??
    Array.from(document.querySelectorAll('span'))
      .filter(({ innerText }) => innerText && searchRegex.test(innerText))
      .map(({ innerText }) => innerText)[0]
  )?.replace(
    /(?:\nM[åÅ]ndag):?(?:\s\d+\/\d)?\s+(?=\nTisdag)\nTisdag:?(?:\s\d+\/\d)?\s+(?=\nOnsdag)\nOnsdag:?(?:\s\d+\/\d)?\s+(?=\nTorsdag)\nTorsdag:?(?:\s\d+\/\d)?\s+(?=\nFredag)\nFredag:?(?:\s\d+\/\d)?\s+(?=\nVeckans|L[öÖ]rdag|\n{2,}|\n+\s{2,})|(?:\nM[åÅ]n):?(?:\s\d+\/\d)?\s+(?=\nTis)\nTis:?(?:\s\d+\/\d)?\s+(?=\nOns)\nOns:?(?:\s\d+\/\d)?\s+(?=\nTors)\nTors:?(?:\s\d+\/\d)?\s+(?=\nFre)\nFre:?(?:\s\d+\/\d)?\s+(?=\nVeckans|L[öÖ]rdag|\n{2,}|\n+\s{2,})/gim,
    ''
  );

  if (debug) {
    console.timeEnd(`Generic scraper for ${lunchUrl}`);
    console.log(`[SCRAPER DEBUG] [Document] ${document}`);
    console.log(`[SCRAPER DEBUG] [Lunch Menu] ${lunchMenu}`);
    return JSON.stringify(lunchMenu ?? '404 No lunch menu found');
  }

  const lunchWeek: LunchMenu[] = [];
  const weeklySpecials: WeeklySpecial[] = [];
  if (lunchMenu) {
    const lunchMatch = lunchMenu.matchAll(
      lunchRegex ??
        /(?<=\n|\s|^)(?:Måndag|Tisdag|Onsdag|Torsdag|Fredag|Mån|Tis|Ons|Tors|Fre)\s*:?(?:\s*\d+\/\d+)?\s*\n+([\s\S]*?)(?=\n+\s*(?:Måndag|Tisdag|Onsdag|Torsdag|Fredag|Mån|Tis|Ons|Tors|Fre)\b|\nVeckans|L[öÖ]rdag|\n{2,}|\n+\s{2,})/gim
    );
    const weeklyMatch = lunchMenu.matchAll(
      weeklyRegex ??
        /\n+(Veckans\s(?!Lunch)\w+):?\s+(?!\/\s?Veckans)([a-zA-ZåäöÅÄÖ\W,.0-9\s-]*?)(?=\nVeckans|M[åÅ]ndag|-{3,}|\n[A-Ö])/gim
    );
    const lunchGroups = [...lunchMatch];
    if (lunchGroups) {
      lunchGroups.forEach((group, index) => {
        if (group) {
          const food = group[1];
          if (food) {
            lunchWeek.push({
              day: sweDays[index],
              food: decodeHtmlEntity(
                food
                  .replace(/\d\.\s?/gim, '')
                  .replace(/^\s?\*\s?/gm, '')
                  .replace(/\n{2,}/gim, '\n')
                  .replaceAll('• ', '')
              ).trim(),
            } as LunchMenu);
          }
        }
      });
    }
    for (const group of weeklyMatch) {
      if (group[1] && group[2] && group[2].length > 0) {
        weeklySpecials.push({
          type: group[1].toSentenceCase(),
          food: decodeHtmlEntity(group[2].replaceAll(/\d\.\s?/gim, '')).trim(),
        } as WeeklySpecial);
      }
    }
  }
  console.timeEnd(`Generic scraper for ${lunchUrl}`);
  return weeklySpecials.length > 0
    ? {
        lunchWeek,
        weeklySpecials: removeDuplicatesWithKey<WeeklySpecial>(weeklySpecials, 'type'),
      }
    : lunchWeek;
};

export default genericWebScraper;
