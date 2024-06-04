import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { useRouter } from "expo-router";

import Button from "@/components/Button";

import colorPokemonType from "@/types/colorsPokemonType";
import { usePokemonLiked } from "@/context/PokemonLiked";

const Like = () => {
  const router = useRouter();

  const { likedPokemon } = usePokemonLiked();

  if (!likedPokemon) {
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
          <Circle cx="150" cy="150" r="150" fill={colorPokemonType[likedPokemon.types[0]]} />
        </Svg>
        <Image source={{ uri: likedPokemon.sprites.other.showdown.front_default }} style={styles.image} />
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
