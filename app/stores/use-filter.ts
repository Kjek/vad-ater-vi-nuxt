import { defineStore } from 'pinia';
import { sweDays } from '~/types/swedish-days';

export const useFilterStore = defineStore('filter', () => {
  const today = ref<string>('');
  const daysSelected = ref<string[]>([]);
  const isAllDaysSelected = ref<boolean>(false);

  const filterDay = (day: string) => {
    daysSelected.value = [day];
  };

  const toggleAll = () => {
    if (isAllDaysSelected.value) {
      daysSelected.value = [today.value];
    } else {
      daysSelected.value = sweDays.map((day) => day);
    }
    isAllDaysSelected.value = !isAllDaysSelected.value;
  };

  const isDaySelected = (day: string) => daysSelected.value.includes(day);

  onMounted(() => {
    const today = new Date().today();
    daysSelected.value = [today];
  });

  return { daysSelected, isAllDaysSelected, toggleDay: filterDay, toggleAll, isDaySelected };
});
