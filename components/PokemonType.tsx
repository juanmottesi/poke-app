import { StyleSheet, Text, View } from "react-native";

import typeStyles from "@/styles/typesStyles";
import { PokemonTypeEnum } from "@/types/api";

type PokemonTypeProps = {
  name: PokemonTypeEnum;
  withName?: boolean
}

const PokemonType = ({ name, withName = false }: PokemonTypeProps) => {
  if(!withName) {
    return <View style={[styles.circle, typeStyles[name]]} />
  }
  return (
    <View style={styles.pill}>
      <View style={[styles.circle, typeStyles[name]]} />
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  pill: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    gap: 4,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
})


export default PokemonType;
