export interface ResponsePokemonType {
  results: { name: string}[];
}

export enum PokemonTypeEnum {
  normal = 'normal',
  fire = 'fire',
  fighting = 'fighting',
  water = 'water',
  flying = 'flying',
  grass = 'grass',
  poison = 'poison',
  electric = 'electric',
  ground = 'ground',
  psychic = 'psychic',
  rock = 'rock',
  ice = 'ice',
  bug = 'bug',
  dragon = 'dragon',
  ghost = 'ghost',
  dark = 'dark',
  steel = 'steel',
  fairy = 'fairy',
  stellar = 'stellar',
  unknown = 'unknown'
}

export interface ResponsePokemonGraphQLType {
  data: {
    pokemon_v2_pokemon: { name: string, id: number }[]
  }
}

export interface PokemonResponse {
  abilities: Ability[]
  base_experience: number
  height: number
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_abilities: any[]
  past_types: any[]
  sprites: Sprites
  stats: StatInterface[]
  types: Type[]
  weight: number
}

export interface PokemonInterface {
  abilities: Ability[]
  base_experience: number
  height: number
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: string[]
  name: string
  order: number
  past_abilities: any[]
  past_types: any[]
  sprites: Sprites
  stats: StatInterface[]
  types: PokemonTypeEnum[]
  weight: number
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Move {
  move: {
    name: string
    url: string
  };
}

export interface Sprites {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
  other: {
    showdown: {
      front_default: string
    }
  }
}

export interface StatInterface {
  base_stat: number | string
  stat: {
    name: string
  }
}

export interface Type {
  slot: number
  type: {
    name: string
    url: string
  }
}

export type RealType = 'normal' | 'fire' | 'fighting' | 'water' | 'flying' | 'grass' | 'poison' | 'electric' | 'ground' | 'psychic' | 'rock' | 'ice' | 'bug' | 'dragon' | 'ghost' | 'dark' | 'steel' | 'fairy' | 'stellar' | 'unknown';