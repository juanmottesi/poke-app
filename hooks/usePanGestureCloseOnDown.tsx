import { useRouter } from "expo-router";
import { useState } from "react";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { Dimensions } from "react-native";

const { height } = Dimensions.get('screen');

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const usePanGestureCloseOnDown = () => {
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

    return { animatedStyles, pan };
}

export default usePanGestureCloseOnDown;
