import { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "@/components/Button";

import { getPokemon } from "@/service/api";

import { LIKED_POKEMON } from "@/utils/constants";

import { PokemonInterface } from "@/types/api";
import colorPokemonType from "@/types/colorsPokemonType";

const Like = () => {
  const router = useRouter();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonInterface | null>(null);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem(LIKED_POKEMON)
      .then((pokemonName) => {
        if (pokemonName) return getPokemon(pokemonName);
        return Promise.reject('No liked pokemons found.');
      })
      .then((data: PokemonInterface) => setPokemon(data))
      .catch(() => null)
      .finally(() => {
        setLoading(false);
      });
  }, [isFocused]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!pokemon) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No liked pokemons found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Svg style={styles.background}>
          <Circle cx="150" cy="150" r="150" fill={colorPokemonType[pokemon.types[0]]} />
        </Svg>
        <Image source={{ uri: pokemon.sprites.other.showdown.front_default }} style={styles.image} />
      </View>
      <Button onPress={() => router.push(`/like/delete`)} text="Remove like" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
  },
  view: {
    position: 'relative',
    height: 300,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  }
});

export default Like;
