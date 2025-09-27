<template>
  <VueAwesomePaginate
    v-bind="$attrs"
    :model-value="modelValue"
    :total-items="totalItems"
    :current-page="currentPage"
    :items-per-page="itemsPerPage"
    :number-buttons-class="btnClasses"
    :backButtonClass="btnClasses"
    :nextButtonClass="btnClasses"
    :firstButtonClass="btnClasses"
    :lastButtonClass="btnClasses"
    :startingBreakpointButtonClass="btnClasses"
    :endingBreakPointButtonClass="btnClasses"
    :firstPageButtonClass="btnClasses"
    :lastPageButtonClass="btnClasses"
    :disabledBreakPointButtonClass="btnClasses"
    :backwardJumpButtonClass="btnClasses"
    :forwardJumpButtonClass="btnClasses"
    :disabledBackwardJumpButtonClass="btnClasses"
    :disabledBackButtonClass="btnClasses"
    :disabledFirstButtonClass="btnClasses"
    :disabledLastButtonClass="btnClasses"
    :disabledNextButtonClass="btnClasses"
    :disabledForwardJumpButtonClass="btnClasses"
    @click="$emit('click', $event)"
    class="pagination"
  />
</template>

<script setup lang="ts">
  import { VueAwesomePaginate } from "vue-awesome-paginate";
  import { computed } from "vue";

  type TComponentProps = {
    numberButtonsClass?: string,
    totalItems: number,
    currentPage: number,
    itemsPerPage: number,
    modelValue: number,
  }

  const props = defineProps<TComponentProps>();
  const defaultStyleBtn = 'btn btn--square';
  const btnClasses = computed(() => [
    defaultStyleBtn,
    props.numberButtonsClass
  ].filter(Boolean).join(' '));

  defineEmits(['click']);
</script>
