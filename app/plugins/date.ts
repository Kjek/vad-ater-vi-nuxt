import { sweDays } from '~/types/swedish-days';

export default defineNuxtPlugin(() => {
  Date.prototype.getWeek = function () {
    const date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    const dayNum = date.getUTCDay() || 7;

    // The ISO week-numbering year is the year that contains the Thursday of that week
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);
  };

  Date.prototype.today = function () {
    const today = (new Date().getDay() + 6) % 7;
    return sweDays[today] ?? sweDays[0];
  };
});
