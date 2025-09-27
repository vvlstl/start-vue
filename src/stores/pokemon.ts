import {defineStore} from "pinia";
import type {TPokemonItem} from "@/types/TPokemonItem.ts";
import axios from "axios";

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as TPokemonItem[],
    loading: false,

    //pagination
    currentPage: 1,
    totalElements: 0,
    limit: 12,
  }),

  actions: {
    async loadPokemons() {
      this.loading = true;
      const offset = (this.currentPage - 1) * this.limit;
      try {
        //Искуственная задержка
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.limit}`
        );

        this.totalElements = response.data.count;
        this.pokemons = response.data.results.map((pokemon: any, index: number) => {
          const id = parseInt(pokemon.url.split('/').filter(Boolean).pop());
          return {
            id: id,
            name: pokemon.name,
            picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }
        });
      } finally {
        this.loading = false;
      }
    },

    setCurrentPage(currentPage: number) {
      this.currentPage = currentPage;
    }
  }
})
