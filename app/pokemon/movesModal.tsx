import { StyleSheet, Text, View, FlatList } from "react-native"
import Animated from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";

import GestureLine from "@/components/GestureLine";
import MoveItem from "@/components/MoveItem";

import usePanGestureCloseOnDown from "@/hooks/usePanGestureCloseOnDown";

import { onIos } from "@/utils/format";

const MovesModal = () => {
  const { animatedStyles, pan } = usePanGestureCloseOnDown();

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
