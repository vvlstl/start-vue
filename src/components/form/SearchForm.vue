<template>
  <FormWrapper
    :form-data="formData"
    class="search-form"
  >
    <InputWrap
      :field="formData.fields.query"
      :hide-label="true"
      class="search-form__field"
    >
      <FormInput
        :field="formData.fields.query"
        v-model="formData.fields.query.value"
      />
    </InputWrap>
  </FormWrapper>
</template>
<script setup lang="ts">
  import FormWrapper from "@/components/form/FormWrapper.vue";
  import {reactive, watch} from "vue";
  import InputWrap from "@/components/form/field/InputWrap.vue";
  import FormInput from "@/components/form/field/FormInput.vue";
  import type {TForm} from "@/types/form/TForm.ts";
  import {usePokemonStore} from "@/stores/pokemon.ts";

  const store = usePokemonStore();

  //TODO для верстки
  const formData: TForm = reactive({
    fields: {
      query: {
        name: 'query',
        value: store.query,
        label: 'Поиск',
        attrs: {
          placeholder: 'Поиск',
        }
      },
    },
    attrs: {},
    options: {},
  });

  const emit = defineEmits(['input']);

  watch(() => formData.fields.query.value, (val) => {
	  emit('input', val);
  })
</script>

