<template>
  <input
    class="input"
    type="text"
    v-bind="field.attrs"
    v-model="modelValue"
  >
</template>
<script setup lang="ts">
  import type {TField} from "@/types/form/TField.ts";

  defineProps<{
    field: TField,
    modelValue: string,
  }>();

  const modelValue = defineModel();
</script>

