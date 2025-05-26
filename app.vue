<script setup lang="ts">
// const { habits, seedHabitsAndHabitFrequency } = useHabitStore();
const habitStore = useHabitStore();
function handleSeeding() {
  habitStore.seedHabitsAndHabitFrequency()
  console.log(habitStore.habits);
}

useHead({
  title: 'Habit Tracker'
})
</script>

<template>
  <UApp>
    <div
      class="bg-cover min-w-screen min-h-screen grid bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-900">
      <UCard
        class="m-auto w-fit sm:w-[400px] rounded-3xl ring-1 dark:ring-slate-700 backdrop-blur-2xl bg-white/30 shadow-2xl dark:bg-slate-800/30">
        <div class="border-b-2 border-slate-100 dark:border-slate-700 pb-4 mb-6">
          <nav class="flex justify-between items-center gap-2">
            <UAvatar alt="Justine Castañeda" class="w-20 h-20" />
            <div class="flex gap-2 flex-wrap">
              <HabitFormModal>
                <template #button>
                  <UButton color="success" variant="outline" label="Create" class="rounded-full backdrop-blur-xl"
                    icon="ant-design:plus-outlined" />
                </template>
              </HabitFormModal>
              <UButton @click="handleSeeding" color="info" label="Seed" class="rounded-full"
                icon="material-symbols:database" variant="outline" />
              <ColorModeButton />
            </div>
          </nav>
          <div class="my-3 text-xl font-semibold ">Justine Castañeda</div>
        </div>
        <UCard v-if="habitStore.habits.length === 0"
          class=" ring-0 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 shadow-xl">
          <div class="flex flex-col gap-2 items-center">
            <div>
              <HabitFormModal>
                <template #button>
                  <UButton color="neutral" size="xl" icon="ant-design:plus-outlined" class="rounded-full mb-2 p-2.5" />
                </template>
              </HabitFormModal>

            </div>
            <div class="font-semibold">No habit found</div>
            <div class="text-xs font-light">Create a new habit to track your
              progress
            </div>
          </div>
        </UCard>
        <div class="flex flex-col gap-2" v-else>
          <!-- <CalendarHeatmap
          :values="[{ date: new Date('2025-09-22'), count: 1 }, { date: new Date('2025-08-01'), count: 1 }]"
          :end-date="new Date('2025-08-08')" /> -->
          <!-- <ActivityMap /> -->
          <!-- <UCalendar /> -->
          <div v-for="habit in habitStore.habits">
            <Habit :habit="habit" />
          </div>
        </div>
      </UCard>
    </div>
  </UApp>
</template>
