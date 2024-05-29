import { Image, StyleSheet, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

import colorPokemonType from "@/types/colorsPokemonType";
import { PokemonTypeEnum } from "@/types/api";

const PokemonImage = ({ source, type }: { source: string, type: PokemonTypeEnum }) => {
  return (
    <View style={styles.container}>
      <Svg style={[{ position: 'absolute' }]}>
        <Circle cx="50%" cy="-155%" r="150%" fill={colorPokemonType[type]} />
      </Svg>
      <Image source={{ uri: source }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    height: 140,
    top: 0,
    width: '100%',
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  }, 
  imageContainer: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 175,
    height: 175,
  }
})

export default PokemonImage;