import axios, { AxiosResponse } from 'axios';

import { getPokemonTypeEnum } from '@/utils/format';

import { PokemonInterface, PokemonResponse, ResponsePokemonGraphQLType, ResponsePokemonType } from '@/types/api';

export const getPokemon = (name: string): Promise<PokemonInterface> => (
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response: AxiosResponse<PokemonResponse>) => ({
    ...response.data,
    types: response.data.types.map(({ type: {name} }) => getPokemonTypeEnum(name)),
    moves: response.data.moves.map(({ move: { name } }) => name),
  }) )
);

export const getPokemons = (offset = 0, limit = 20): Promise<PokemonInterface[]> => (
  axios.get('https://pokeapi.co/api/v2/pokemon', { params: { offset, limit } })
    .then((response: AxiosResponse<ResponsePokemonType>) => response.data.results)
    .then((pokemons) => Promise.all(pokemons.map(({ name }) => getPokemon(name))))
);

export const searchPokemons = (search: string): Promise<PokemonInterface[]> => (
  axios.post(
    'https://beta.pokeapi.co/graphql/v1beta',
    {
      query: `query searchPokemons($search: String!) {
        pokemon_v2_pokemon(
          where: {
            name: { _regex: $search }
          }) {
            id
            name
          }
        }`,
      variables: { "search": `^${search.toLowerCase()}*` },
      operationName: "searchPokemons"
    },
  )
    .then((response: AxiosResponse<ResponsePokemonGraphQLType>) => response.data.data.pokemon_v2_pokemon)
    .then((pokemons) => Promise.all(pokemons.map(({ name }) => getPokemon(name))))
)
