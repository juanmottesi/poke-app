import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

import PokemonItem from "@/components/PokemonItem";
import { useIsFocused } from "@react-navigation/native";

import { getPokemon } from "@/service/api";

import { PokemonInterface } from "@/types/api";

const Like = () => {
  const router = useRouter();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonInterface | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    setLoading(true);
    AsyncStorage.getItem('likedPokemons')
      .then((pokemonName) => {
        if (pokemonName) return getPokemon(pokemonName);
        return Promise.reject('No liked pokemons found.');
      })
      .then((data: PokemonInterface) => setPokemon(data))
      .catch(() => {
        timeout = setTimeout(() => router.replace('/home'), 1000);
      })
      .finally(() => {
        setLoading(false);
    });

    return () => {
      if (timeout) clearTimeout(timeout)
    };
  }, [isFocused]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!pokemon) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text>No liked pokemons found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PokemonItem {...pokemon} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Like;
