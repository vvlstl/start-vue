<template>
  <div class="input-wrap">
    <div class="input-wrap__input">
      <label
        v-if="hasLabel"
        class="input-wrap__label"
        :for="field.attrs?.id?.toString()"
      >
        <span class="input-wrap__label-text-wrap">
          <span class="input-wrap__label-text" v-html="field.label"/>
          <span v-if="field.attrs?.required" class="input-wrap__label-required"/>
        </span>
      </label>

      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type {TField} from "@/types/form/TField.ts";
  import {computed} from "vue";

  type TComponentProps = {
    field: TField,
    hideLabel?: boolean,
  }
  const props = defineProps<TComponentProps>();

  const hasLabel = computed(() => props.field?.label && !props.hideLabel);
</script>

