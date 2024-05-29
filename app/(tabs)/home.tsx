import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import PokemonItem from "@/components/PokemonItem";
import EmptyListComponent from "@/components/EmptyListComponent";

import { getPokemons } from "@/service/api";

import { PokemonInterface } from "@/types/api";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);

  useEffect(() => {
    getPokemons(offset).then((data) => {
      setPokemons([...pokemons, ...data]);
      setLoading(false);
    });
  }, [offset]);

  const endReched = () => {
    if (!loading) {
      setOffset((prevState) => prevState + 20);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        style={styles.list}
        data={pokemons}
        renderItem={({ item }) => <PokemonItem key={item.id} {...item} />}
        onEndReached={endReched}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={<EmptyListComponent text={loading ? 'Loading...' : 'No pokemons found'} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
  },
  listContainer: {
    padding: 12,
    gap: 12,
  },
  list: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 12,
  },
});

export default Home;
