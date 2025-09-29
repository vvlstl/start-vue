<template>
  <form
    class="form"
    v-bind="formData.attrs"
  >
    <slot name="form-content">
      <slot name="content">
        <div class="form__fields">
          <slot/>
        </div>
      </slot>
    </slot>
  </form>
</template>
<script setup lang="ts">
  import type {TForm} from "@/types/form/TForm.ts";

  defineProps<{
    formData: TForm;
  }>();
</script>

