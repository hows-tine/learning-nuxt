<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { object, string, type InferType } from 'yup'

const open = ref(false)
const state = reactive({
  title: ''
});

const { addHabit } = useHabitStore();

const schema = object({
  title: string().min(3, 'Habit should at least have 3 characters').required('You need to enter a habit')
})

async function onSubmit(event: FormSubmitEvent<InferType<typeof schema>>) {
  addHabit(state.title)
  state.title = ''
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="Modal with footer" description="This is useful when you want a form in a Modal."
    :ui="{ footer: 'justify-end' }">
    <slot name="button"></slot>

    <template #body>
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormField name="title" label="Habit">
          <UInput class="w-full" v-model="state.title" size="xl"></UInput>
        </UFormField>
        <div class="mt-4 flex gap-2 justify-end">
          <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
          <UButton type="submit" label="Submit" color="neutral" />
        </div>
      </UForm>
    </template>

  </UModal>
</template>
