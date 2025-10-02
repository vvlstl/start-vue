export type TPokemonItem = {
  id: number;
  name: string;
  picture: string;
  abilities: string[],
  height: number,
  stats: TPokemonStats[],
  weight: number,
  types: string[],
}

type TPokemonStats = {
  base_stat: number,
  effort: number,
  stat: { name: string }
}
