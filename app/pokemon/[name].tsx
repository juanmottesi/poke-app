import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { chunk } from 'lodash';

import PokemonImage from "@/components/PokemonImage";
import PokemonType from "@/components/PokemonType";
import Stat from "@/components/Stat";

import { getPokemon } from "@/service/api";

import { createStat, formatId, getStatIcon } from "@/utils/format";

import { PokemonInterface, StatInterface } from "@/types/api";

const Pokemon = () => {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonInterface | null>(null);
  const [likedPokemon, setLikedPokemon] = useState('');

  useEffect(() => {
    if (name) {
      AsyncStorage.getItem('likedPokemons')
        .then((data) => setLikedPokemon(data || ''))
        .then(() => getPokemon(name.toString()))
        .then((data) => setPokemon(data));
    }
  }, [name]);

  if (!pokemon) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    )
  } 

  const goToDetails = () => {
    router.push({
      pathname: '/pokemon/movesModal',
      params: {
        moves: JSON.stringify(pokemon.moves),
      },
    });
  }

  const likePokemon = () => {
    setLikedPokemon(pokemon.name);
    AsyncStorage.setItem('likedPokemons', pokemon.name);
  }

  return (
    <View style={styles.contianer}>
      <PokemonImage source={pokemon.sprites.front_default} type={pokemon.types[0]} />
      <View style={styles.section}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.id}>#{formatId(pokemon.id)}</Text>
        </View>
        <TouchableOpacity style={styles.roundButton} onPress={likePokemon}>
          <AntDesign name="heart" size={24} color={likedPokemon === pokemon.name ? 'red' : '#ccc'} />
        </TouchableOpacity>
      </View>
      <View style={styles.typesContainer}>
        {pokemon.types.map((type) => <PokemonType key={type} name={type} withName />)}
      </View>
      <View style={styles.line} />
      <Text style={styles.statsText}>Stats</Text>
      {
        chunk([
          createStat('height', `${pokemon.height} m`),
          createStat('weight', `${pokemon.weight} kg`),
          ...pokemon.stats
        ], 2).map((stats: StatInterface[], index: number) => (
          <View style={styles.statsContainer} key={index}>
            {
              stats.map(({ base_stat, stat: { name } }) => (
                <Stat key={name} icon={getStatIcon(name)} name={name} value={base_stat} />
              ))
            }
          </View>
        ))
      }
      <View style={styles.line} />
      <TouchableOpacity style={styles.abilitiesButton} onPress={goToDetails}>
        <Text>Abilities</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contianer: {
    display: 'flex',
    width: '100%',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: 16,
  },
  headerContainer: {
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  id: {
    fontSize: 16,
    color: '#666',
  },
  roundButton: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#fafafa',
    marginEnd: 16,
  },
  typesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  line: {
    backgroundColor: '#E5E5E5',
    width: '80%',
    height: 1,
    alignSelf: 'center'
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    padding: 16,  
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    justifyContent: 'space-evenly',
  },
  abilitiesButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center'
  }
})

export default Pokemon;