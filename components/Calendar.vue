<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';

const value = ref({ start: new CalendarDate(2022, 2, 3), end: new CalendarDate(2022, 2, 20) })
</script>

<template>
  <UCalendar range :v-model="value" />
</template>
