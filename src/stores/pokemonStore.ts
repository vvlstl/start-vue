import {defineStore} from "pinia";
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        pokemons: [] as any[],
        total: 0,
        limit: 12,
        offset: 0,
        loading: false,
    }),
    actions: {
        async fetchPokemons(page = 1) {
            this.loading = true
            this.offset = (page - 1) * this.limit
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
                this.total = res.data.count
                this.pokemons = res.data.results.map((p: any, i: number) => {
                    const id = this.offset + i + 1
                    return {
                        id,
                        name: p.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                    }
                })
            } finally {
                this.loading = false
            }
        }
    }
})