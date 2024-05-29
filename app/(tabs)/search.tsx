import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TextInput } from "react-native";

import PokemonItem from "@/components/PokemonItem";
import EmptyListComponent from "@/components/EmptyListComponent";

import { searchPokemons } from "@/service/api";

import { PokemonInterface } from "@/types/api";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);

  const onSearch = () => {
    if (search.length > 2) {
      setLoading(true);
      setPokemons([]);
      searchPokemons(search).then((data) => {
        setPokemons(data);
        setLoading(false);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={onSearch}
        placeholder="Search pokemons..."
        autoCapitalize="none"
        autoComplete="off"
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        style={styles.list}
        data={pokemons}
        renderItem={({ item }) => <PokemonItem key={item.id} {...item} />}
        ListEmptyComponent={<EmptyListComponent text={loading ? 'Loading...' : 'No pokemons found.'} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
  },
  input: {
    margin: 12,
    height: 46,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    color: '#666',
    borderRadius: 20,
  },
  listContainer: {
    gap: 12,
    paddingBottom: 24,
  },
  list: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
  },
});

export default Search;
