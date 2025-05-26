<script setup lang="ts">
import type { Habit } from '@/types/habit.type'
const { addToHabitFrequency, frequency, getHabitFrequencyDate, deleteDateFromHabitFrequency, convertToCalendarDate } = useHabitStore();

const { habit } = defineProps<{ habit: Habit }>()

const isDoneForToday = ref(getHabitFrequencyDate(habit.id, new Date()) !== undefined)
const openCalendar = ref(false);
const openEditHabit = ref(false);

function handleClickHabit(habitId: number) {
  if (!isDoneForToday.value) {
    addToHabitFrequency(habitId, new Date())
  } else {
    deleteDateFromHabitFrequency(habitId, new Date());
  }
  isDoneForToday.value = !isDoneForToday.value
}

function getFormattedDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>
<template>
  <UCard :key="habit.id" class="dark:bg-neutral-700 bg-neutral-200 ring-2 rounded-3xl justify-between">
    <div class="flex justify-between items-center">
      <div>{{ habit.name }}</div>
      <div class="flex gap-2">
        <UButton @click="openCalendar = !openCalendar" color="neutral" variant="subtle" class="rounded-full"
          icon="material-symbols:calendar-month-outline" />
        <UButton icon='material-symbols:edit-outline' color="neutral" variant="subtle" class="rounded-full" />
        <UButton @click="() => handleClickHabit(habit.id)" :color="isDoneForToday ? 'error' : 'success'"
          class="rounded-full" :icon="isDoneForToday ? 'gridicons:cross-circle' : 'material-symbols:check-circle'" />
        <!-- <UCalendar class="w-[150px] h-[50px]" :month-controls="false" :year-controls="false" /> -->
      </div>
      <UModal v-model:open="openEditHabit" :title="`Edit ${habit.name}`">
        <template></template>
      </UModal>
      <UModal v-model:open="openCalendar" :title="getFormattedDate(new Date())"
        :description="isDoneForToday ? 'Congratulations! Habit has already been done for today.' : `It's not yet late to do the habit today!`"
        :ui="{ footer: 'justify-end' }">
        <template #body>
          <!-- <Calendar /> -->
          <HabitBoxGrid :habit="habit" :habitFrequency="frequency" />
        </template>
        <template #footer>
          <div class="mt-4 flex gap-2 justify-end">
            <UButton label="Minimize" color="neutral" variant="outline" @click="openCalendar = false" />
            <UButton @click="() => handleClickHabit(habit.id)" :color="isDoneForToday ? 'error' : 'success'"
              :icon="isDoneForToday ? 'gridicons:cross-circle' : 'material-symbols:check-circle'" />
          </div>
        </template>
      </UModal>
    </div>
  </UCard>
</template>
