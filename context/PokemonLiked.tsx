import { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPokemon } from "@/service/api";

import { LIKED_POKEMON } from "@/utils/constants";

import { PokemonInterface } from "@/types/api";

type PokemonContextType = {
  likedPokemon: PokemonInterface | null;
  likePokemon: (pokemon: PokemonInterface) => Promise<void>;
  removeLikedPokemon: () => Promise<void>;
};

const PokemonLikedContext = createContext<PokemonContextType>({
  likedPokemon: null,
  likePokemon: () => Promise.resolve(),
  removeLikedPokemon: () => Promise.resolve()
});

const PokemonLikedProvider = ({ children }: PropsWithChildren<{}>) => {
  const [likedPokemon, setLikedPokemon] = useState<PokemonInterface | null>(null);
  
  useEffect(() => {
    AsyncStorage.getItem(LIKED_POKEMON)
      .then((pokemonName) => {
        if (pokemonName) return getPokemon(pokemonName);
        return Promise.reject('No liked pokemons found.');
      })
      .then((data: PokemonInterface) => setLikedPokemon(data))
      .catch(() => null);
  }, []);

  const likePokemon = (pokemon: PokemonInterface) => {
    setLikedPokemon(pokemon);
    return AsyncStorage.setItem(LIKED_POKEMON, pokemon.name);
  }

  const removeLikedPokemon = () => {
    setLikedPokemon(null);
    return AsyncStorage.removeItem(LIKED_POKEMON);
  }

  return (
    <PokemonLikedContext.Provider value={{ likedPokemon, likePokemon, removeLikedPokemon }}>
      {children}
    </PokemonLikedContext.Provider>
  );
};

export const usePokemonLiked = () => useContext(PokemonLikedContext);

export default PokemonLikedProvider;