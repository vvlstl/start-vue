<template>
  <div class="pokemon-list">
    <div class="pokemon-list__title">Pokémon Gallery</div>
    <template v-if="store.loading">
      <Loader/>
    </template>
    <template v-else>
      <SearchForm
        class="pokemon-list__search"
        @input="store.searchPokemons"
      />

      <div
        v-if="store.getPokemons.length === 0 && store.query"
        class="pokemon-list__empty"
      >
        No Pokemon found for "{{ store.query }}"
      </div>

      <div
        v-else
        class="pokemon-list__items"
      >
        <PokemonCard
          v-for="pokemon in store.getPokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>

      <Pagination
        v-if="store.getPokemons.length > 0 && store.getTotalPages > 1"
        class="pokemon-list__pagination"
        :total-items="store.getTotalItems"
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
  import {onMounted, watch} from "vue";
  import {usePokemonStore} from "@/stores/pokemon.ts";
  import Loader from "@/components/common/Loader.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import SearchForm from "@/components/form/SearchForm.vue";
  import PokemonCard from "@/components/pokemon/PokemonCard.vue";
  import {useRoute, useRouter} from "vue-router";

  const store = usePokemonStore();
  const route = useRoute();
  const router = useRouter();

  async function handlePageChange(page: number) {
    store.setCurrentPage(page);
    await router.push({params: {page: page === 1 ? '' : page}});
    await store.loadPokemons(page)
  }

  onMounted(async () => {
    const pageFromUrl = route.params.page ? Number(route.params.page) : 1;
    store.setCurrentPage(pageFromUrl);
    await store.loadPokemons(pageFromUrl);
  });

  watch(() => route.params.page, async (newValuePage) => {
    const page = newValuePage ? Number(newValuePage) : 1;
    if (page !== store.currentPage) {
      store.setCurrentPage(page);
      await store.loadPokemons(page);
    }
  })
</script>
