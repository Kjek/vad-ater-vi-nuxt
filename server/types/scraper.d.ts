import { LunchMenu, WeekMenu } from '~/types/lunch-menu';

type Scraper = (
  lunchUrl: string,
  lunchRegex?: RegExp | undefined,
  weeklyRegex?: RegExp | undefined,
  debug?: boolean
) => Promise<LunchMenu[] | WeekMenu | string>;

export default Scraper;
