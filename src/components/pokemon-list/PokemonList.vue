<template>
  <div class="pokemon-list">
    <div class="pokemon-list__title">Pokémon Gallery</div>
    <div class="pokemon-list__items">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import PokemonCard from "@/components/pokemon-list/PokemonCard.vue";
  import {onMounted, ref} from "vue";
  import type {TPokemonItem} from "@/types/TPokemonItem.ts";
  import axios from "axios";

  const pokemons = ref<TPokemonItem[]>([]);

  onMounted(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      pokemons.value = response.data.results.map((pokemon: any, index: number) => {
        const id = index + 1;
        return {
          id: id,
          name: pokemon.name,
          picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        }
      });
    })
  });
</script>
