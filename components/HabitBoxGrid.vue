<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">{{ habit.name }}</h2>
    <div class="grid  grid-rows-7 grid-flow-col gap-1">
      <!-- <div v-for="date in dateRange" :key="date" class="w-6 h-6 rounded" :class="{
        'bg-green-500': isCompleted(date),
        'bg-gray-300': !isCompleted(date)
      }" :title="date" /> -->
      <UTooltip :text="date" v-for="date in dateRange" :key="date">
        <div class="w-3 h-3 rounded" :class="{
          'bg-green-500': isCompleted(date),
          'bg-gray-300': !isCompleted(date)
        }" />
      </UTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format, eachDayOfInterval, parseISO } from 'date-fns'

interface Habit {
  id: number
  name: string
  dateStarted?: string
  dateEnded?: string
}

interface Frequency {
  date: string
}

interface Props {
  habit: Habit
  habitFrequency: Record<number, Frequency[]>
}

const props = defineProps<Props>()

const dateRange = computed(() => {
  if (!props.habit.dateStarted || !props.habit.dateEnded) return []

  const start = parseISO(props.habit.dateStarted)
  const end = parseISO(props.habit.dateEnded)

  return eachDayOfInterval({ start, end }).map(date =>
    format(date, 'yyyy-MM-dd')
  )
})

const isCompleted = (date: string) => {
  const freqs = props.habitFrequency[props.habit.id] || []
  return freqs.some(freq => freq.date === date)
}
</script>
