import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import PokemonType from "./PokemonType";

import { formatId } from "@/utils/format";

import { PokemonInterface } from "@/types/api";

const PokemonItem = ({ id, name, sprites, types }: PokemonInterface) => {
  const router = useRouter()
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/pokemon/${name}`)}>
      <Image source={{ uri: sprites.front_default }} style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>#{formatId(id)}</Text>
      </View>
      <View style={styles.typeContainer}>
        {types.map((type) => <PokemonType key={`${id}_${type}`} name={type} />)}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  number: {
    fontSize: 12,
    color: "#666"
  },
  typeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginStart: "auto",
  }
});

export default PokemonItem;
