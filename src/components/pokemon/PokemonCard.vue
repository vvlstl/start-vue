<template>
  <RouterLink
    class="pokemon-card"
    :to="{
        name: 'pokemon.detail',
        params: {
          id: pokemon.id,
        }
    }"
  >
    <div class="pokemon-card__picture">
      <img
        :src="pokemon.picture"
        :alt="pokemon.name"
      />
    </div>
    <div class="pokemon-card__name" v-html="pokemon.name"/>
    <div class="pokemon-card__id">#{{ pokemon.id }}</div>
  </RouterLink>
</template>
<script setup lang="ts">
  import type {TPokemonItem} from "@/types/TPokemonItem.ts";

  defineProps<{
    pokemon: TPokemonItem,
  }>()
</script>

