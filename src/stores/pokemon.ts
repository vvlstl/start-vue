import {defineStore} from "pinia";
import type {TPokemonItem} from "@/types/TPokemonItem.ts";
import axios from "axios";

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as TPokemonItem[],
    allPokemons: [] as TPokemonItem[],
    loading: false,

    //pagination
    currentPage: 1,
    totalElements: 0,
    limit: 12,

    //search
    searchResults: [] as TPokemonItem[],
    query: '',
  }),

  getters: {
    getPokemons(state) {
      if (state.query) {
        const start = (state.currentPage - 1) * state.limit;
        const end = start + state.limit;
        return state.searchResults.slice(start, end);
      }
      return state.pokemons;
    },

    getTotalItems(state) {
      return state.query ? state.searchResults.length : state.totalElements;
    },

    getTotalPages(state){
      const total = state.query ? state.searchResults.length : state.totalElements;
      return Math.ceil(total / state.limit);
    }
  },

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

        if (!this.allPokemons.length) {
          await this.loadAllPokemons(this.totalElements);
        }

      } finally {
        this.loading = false;
      }
    },

    async loadAllPokemons(totalCount: number) {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalCount}`);
      this.allPokemons = res.data.results.map((pokemon: any, index: number) => {
        const id = parseInt(pokemon.url.split('/').filter(Boolean).pop());
        return {
          id: id,
          name: pokemon.name,
          picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        }
      });
    },

    searchPokemons(query: string) {
      const q = query.trim().toLowerCase();
      this.query = q;
      this.currentPage = 1;

      if (q === '') {
        this.searchResults = [];
        return;
      }

      this.searchResults = this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(q)
      );
    },

    setCurrentPage(currentPage: number) {
      this.currentPage = currentPage;
    }
  }
})
