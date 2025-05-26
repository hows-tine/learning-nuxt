<script setup lang="ts">
import { CalendarHeatmap } from 'vue3-calendar-heatmap';

interface Props {
  values: {
    date: Date,
    count: number
  }[],
  endDate: Date,

}

const props = defineProps<Props>()

defineExpose(CalendarHeatmap)
</script>

<template>
  <CalendarHeatmap :values="props.values" :end-date="props.endDate" dark-mode :max="1"
    :tooltip-formatter="(v) => `✅ ${v.date}`" :no-data-text="'No'" />
</template>
