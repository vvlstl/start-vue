import {defineStore} from "pinia";
import axios from 'axios'
import type {TPokemon} from "@/types/pokemon/pokemon.ts";
import type {TPokemonListItem} from "@/types/pokemon/pokemon-list-item.ts";

export const usePokemonStore = defineStore('pokemon', {
	state: () => ({
		pokemons: [] as TPokemonListItem[],
		pokemon: null as TPokemon | null,
		total: 0,
		limit: 12,
		offset: 0,
		loading: false,
		loadingText: "Loading...",
	}),
	actions: {
		async getPokemons(page = 1) {
			this.loading = true
			this.offset = (page - 1) * this.limit
			try {
				const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
				this.total = res.data.count
				this.pokemons = res.data.results.map(
					(pokemon: { name: string; url: string }, i: number) => {
						const id = this.offset + i + 1
						return {
							id,
							name: pokemon.name,
							image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
						}
					}
				)
			} finally {
				this.loading = false
			}
		},

		async getPokemon(id: number) {
			this.loading = true
			try {
				const res = await axios.get<TPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
				this.pokemon = res.data
			} finally {
				this.loading = false
			}
		},
	}
})


