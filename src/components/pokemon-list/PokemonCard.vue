<template>
  <div class="pokemon-card">
    <div class="pokemon-card__picture">
      <img
        :src="pokemon.picture"
        :alt="pokemon.name"
      />
    </div>
    <div class="pokemon-card__name" v-html="pokemon.name"/>
    <div class="pokemon-card__id">#{{pokemon.id}}</div>
  </div>
</template>
<script setup lang="ts">
  import type {TPokemonItem} from "@/types/TPokemonItem.ts";

  defineProps<{
    pokemon: TPokemonItem,
  }>()
</script>

