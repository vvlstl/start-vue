<template>
  <div class="pokemon-detail" v-if="store.pokemon">
    <div class="pokemon-detail__header">
      <div class="pokemon-detail__picture">
        <img
          :src="store.pokemon.picture"
          :alt="store.pokemon.name"
        >
      </div>
      <div class="pokemon-detail__title">
        {{ store.pokemon.name }} #{{ store.pokemon.id }}
      </div>
    </div>
    <div class="pokemon-detail__info">
      <div class="pokemon-info-table">
        <div class="pokemon-info-table__item">
          <div class="pokemon-info-table__title">Height</div>
          <div
            class="pokemon-info-table__value"
            v-html="store.pokemon.height"
          />
        </div>
        <div class="pokemon-info-table__item">
          <div class="pokemon-info-table__title">Weight</div>
          <div
            class="pokemon-info-table__value"
            v-html="store.pokemon.weight"
          />
        </div>
        <div class="pokemon-info-table__item">
          <div class="pokemon-info-table__title">Types</div>
          <div
            class="pokemon-info-table__value"
            v-html="store.pokemon.types.join(', ')"
          />
        </div>
        <div class="pokemon-info-table__item">
          <div class="pokemon-info-table__title">Abilities</div>
          <div
            class="pokemon-info-table__value"
            v-html="store.pokemon.abilities.join(', ')"
          />
        </div>
      </div>
    </div>
    <div class="pokemon-detail__base-stats">
      <div class="pokemon-info-table-stats">
        <div
          v-for="(statItem, index) in store.pokemon.stats"
          :key="index"
          class="pokemon-info-table-stats__item"
        >
          <div
            class="pokemon-info-table-stats__title"
            v-html="statItem.stat.name"
          />
          <div
            class="pokemon-info-table-stats__value"
            v-html="statItem.base_stat"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {onMounted} from "vue";
  import {usePokemonStore} from "@/stores/pokemon.ts";
  import {useRoute} from "vue-router";

  const store = usePokemonStore();
  const route = useRoute();

  onMounted(() => {
    store.loadPokemon(Number(route.params.id));
  })
</script>

