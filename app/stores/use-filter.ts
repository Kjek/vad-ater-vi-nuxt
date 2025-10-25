import { da } from '@nuxt/ui/runtime/locale/index.js';
import { defineStore } from 'pinia';
import { sweDays } from '~/types/swedish-days';

export const useFilterStore = defineStore('filter', () => {
  const today = new Date().getDay() - 1;
  const daysSelected = ref<string[]>([sweDays[today] ?? 'Måndag']);
  const isAllDaysSelected = ref<boolean>(false);

  const filterDay = (day: string) => {
    daysSelected.value = [day];
  };

  const toggleAll = () => {
    if (isAllDaysSelected.value) {
      daysSelected.value = [sweDays[today] ?? 'Måndag'];
    } else {
      daysSelected.value = sweDays.map((day) => day);
    }
    isAllDaysSelected.value = !isAllDaysSelected.value;
  };

  const isDaySelected = (day: string) => daysSelected.value.includes(day);
  return { daysSelected, isAllDaysSelected, toggleDay: filterDay, toggleAll, isDaySelected };
});
