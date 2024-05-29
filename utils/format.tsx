import { ReactNode } from "react";
import { AntDesign, FontAwesome5, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { PokemonTypeEnum, StatInterface } from "@/types/api"

export const formatId = (id: number) => `0000${id}`.slice(-5)

export const getPokemonTypeEnum = (name: string): PokemonTypeEnum => {
  if (Object.values(PokemonTypeEnum).includes(name as PokemonTypeEnum)) {
    return name as PokemonTypeEnum;
  }
  return PokemonTypeEnum.unknown;
}

export const getStatIcon = (name: string, size = 16, color = '#666') => {
  const icons: { [key: string]: ReactNode } = {
    'hp': <AntDesign name="heart" size={size} color={color} />,
    'attack': <MaterialCommunityIcons name="sword" size={size} color={color} />,
    'defense': <FontAwesome6 name="shield" size={size} color={color} />,
    'special-attack': <FontAwesome6 name="wand-sparkles" size={size} color={color} />,
    'special-defense': <MaterialCommunityIcons name="shield-star" size={size} color={color} />,
    'speed': <MaterialIcons name="speed" size={size} color={color} />,
    'height': <MaterialIcons name="height" size={size} color={color} />,
    'weight': <FontAwesome5 name="weight-hanging" size={size} color={color} />

  }

  return icons[name] || <AntDesign name="question" size={size} color={color} />;
}

export const createStat = (name: string, value: string | number): StatInterface => ({
  base_stat: value,
  stat: {
    name
  }
})