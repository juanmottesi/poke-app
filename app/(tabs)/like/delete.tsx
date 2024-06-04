import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import Button from "@/components/Button";

import { usePokemonLiked } from "@/context/PokemonLiked";

const Like = () => {
  const router = useRouter();
  const { removeLikedPokemon } = usePokemonLiked();

  const deletePokemon = () => {
    removeLikedPokemon()
      .then(() => router.replace('/'))
  }

  const goBack = () => {
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Do you want to remove the like?</Text>
      <View style={styles.buttonContainer}>
        <Button text="Yes" onPress={deletePokemon} style={styles.warningButton} />
        <Button text="No" onPress={goBack} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  warningButton: {
    backgroundColor: 'red',
  },
});

export default Like;
