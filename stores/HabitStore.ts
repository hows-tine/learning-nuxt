import { defineStore } from "pinia";
import type { Habit, HabitFrequency } from "~/types/habit.type";
import { CalendarDate } from '@internationalized/date';


export const useHabitStore = defineStore('habit', () =>{
  const habits = ref<Habit[]>([]);
  const frequency = ref<HabitFrequency>({});

  const lastId = computed(() => ({
    habits: habits.value.length > 0 ? Math.max(...habits.value.map(h => h.id)) : 0
  }))

  function addHabit(name: string): void {
    habits.value.push({
      id: lastId.value.habits + 1,
      name: name,
      dateStarted: convertDateToString(new Date()),
      dateEnded: convertDateToString(addAYearToDate(new Date()))
    });
  }

  function removeHabit(habitId: number): void {
    habits.value = habits.value.filter(h => h.id !== habitId);
  }

  function updateHabit(updatedHabit: Habit): void {
    const index = habits.value.findIndex(h => h.id === updatedHabit.id);
    if (index !== -1) {
      habits.value[index] = updatedHabit;
    }
  }

  function getHabitById(habitId: number): Habit | undefined {
    return habits.value.find(h => h.id === habitId);
  }

  function getHabitFrequency(habitId: number): HabitFrequency | undefined {
    const habit = habits.value.find(h => h.id === habitId);
    if (!habit) return undefined;
  }

  function getHabitFrequencyDate(habitId: number, date: Date): HabitFrequency | undefined {
    const convertedDate = convertDateToString(date);
    return frequency.value[habitId]?.find(f => f.date === convertedDate);
  }

  function addToHabitFrequency(habitId: number, date: Date): void {
    const convertedDate = convertDateToString(date);
    console.log(`Adding date ${convertedDate} to habit ${habitId}`);
    if (frequency.value[habitId]) {
      frequency.value[habitId].push({ date: convertedDate });
    } else { 
      frequency.value[habitId] = [{ date: convertedDate }]
    }
  }

  function deleteDateFromHabitFrequency(habitId: number, date: Date): void {
    if (frequency.value[habitId]) {
      console.log(`Deleting date ${convertDateToString(date)} from habit ${habitId}`);
      const habitFrequency = frequency.value[habitId];
      const convertedDate = convertDateToString(date);
      frequency.value[habitId] = habitFrequency.filter(f => f.date !== convertedDate);
    }
  }

  function convertDateToString(date: Date): string {
    return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
  } 

  function addAYearToDate(date: Date): Date {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }

  function convertToCalendarDate(date: string): CalendarDate {
    const parts = date.split('-');
    return new CalendarDate(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function seedHabitsAndHabitFrequency(): void {
  const startDate = new Date('2025-05-26');
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);

  function randomDatesBetween(start: Date, end: Date, count: number): string[] {
    const dates: Set<string> = new Set();

    while (dates.size < count) {
      const time = start.getTime() + Math.random() * (end.getTime() - start.getTime());
      const date = new Date(time);
      dates.add(convertDateToString(date));
    }

    return Array.from(dates).sort();
  }

  habits.value = [
    { id: 1, name: 'Drink Water', dateStarted: convertDateToString(startDate), dateEnded: convertDateToString(endDate) },
    { id: 2, name: 'Exercise', dateStarted: convertDateToString(startDate), dateEnded: convertDateToString(endDate) },
    { id: 3, name: 'Read a Book', dateStarted: convertDateToString(startDate), dateEnded: convertDateToString(endDate) }
  ];

  // biome-ignore lint/complexity/noForEach: <explanation>
  habits.value.forEach(habit => {
    const randomCount = Math.floor(Math.random() * 20) + 10; // between 10 and 30
    frequency.value[habit.id] = randomDatesBetween(startDate, endDate, randomCount).map(date => ({ date }));
  });

  console.log('Seeded habits and habit frequency');
  console.log('Habits:', habits.value);
  console.log('Frequency:', frequency);
}

  return {
    habits,
    frequency,
    addHabit,
    removeHabit,
    updateHabit,
    getHabitById,
    getHabitFrequency,
    getHabitFrequencyDate,
    addToHabitFrequency,
    deleteDateFromHabitFrequency,
    convertToCalendarDate,
    seedHabitsAndHabitFrequency
  }
})



