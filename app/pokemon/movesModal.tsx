import { useState } from "react";
import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams, useRouter } from "expo-router";

import GestureLine from "@/components/GestureLine";
import MoveItem from "@/components/MoveItem";

import { onIos } from "@/utils/format";

const { height } = Dimensions.get('screen');

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const MovesModal = () => {
  const router = useRouter();
  const translationY = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const [canClose, setCanClose] = useState(true);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value }],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateY = height / 2 - 50;
      if (prevTranslationY.value > prevTranslationY.value + event.translationY) {
        setCanClose(false)
      } else {
        setCanClose(true)
        translationY.value = clamp(
          prevTranslationY.value + event.translationY,
          -maxTranslateY,
          maxTranslateY
        );
      }
      
    })
    .onEnd(() => {
      if (canClose) {
        router.back()
      }
    })
    .runOnJS(true);

  const { moves } = useLocalSearchParams();
  const movesData = moves ? JSON.parse(moves.toString()): [];

  return (
    <GestureHandlerRootView>
      <Animated.View style={[styles.container, animatedStyles]}>
        <View style={styles.container} />
        <View style={styles.modal}>
          <GestureDetector gesture={pan}>
            <View style={styles.headerContainer}>
              <GestureLine />
              <Text>Moves</Text>
            </View>
          </GestureDetector>
          <FlatList
            data={movesData}
            renderItem={({ item }) => (<MoveItem name={item} />)}
            style={styles.abilitiesContainer}
            keyExtractor={item => item}
          />
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1},
  modal: {
    flex: 3,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 0.5,
  },
  abilitiesContainer: {
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: onIos(24, 0),
  }
})

export default MovesModal;
