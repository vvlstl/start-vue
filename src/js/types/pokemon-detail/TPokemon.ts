export type TPokemon = {
    id: number
    name: string
    base_experience: number
    height: number
    weight: number
    sprites: {
        front_default: string | null
        other?: {
            'official-artwork'?: { front_default: string | null }
        }
    }
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[]
    abilities: {
        is_hidden: boolean
        slot: number
        ability: {
            name: string
            url: string
        }
    }[]
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: string
            url: string
        }
    }[]
}
