<template>
  <div class="pokemon-list">
    <div class="pokemon-list__title">Pokémon Gallery</div>
    <template v-if="store.loading">
      <Loader/>
    </template>
    <template v-else>
      <div class="pokemon-list__items">
        <PokemonCard
          v-for="pokemon in store.pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>

      <Pagination
        v-if="store.pokemons.length > 0"
        class="pokemon-list__pagination"
        :total-items="store.totalElements"
        :items-per-page="store.limit"
        :current-page="store.currentPage"
        v-model="store.currentPage"
        :max-pages-shown="3"
        @click="handlePageChange"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
  import PokemonCard from "@/components/pokemon-list/PokemonCard.vue";
  import {onMounted} from "vue";
  import {usePokemonStore} from "@/stores/pokemon.ts";
  import Loader from "@/components/common/Loader.vue";
  import Pagination from "@/components/common/Pagination.vue";

  const store = usePokemonStore();

  async function handlePageChange(page: number) {
    store.setCurrentPage(page);
    await store.loadPokemons()
  }

  onMounted(() => {
    store.loadPokemons();
  });
</script>
