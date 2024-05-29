import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Head = ({ color = 'white' }) => {
  const router = useRouter();
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={color === 'white' ? 'black' : 'white'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 96,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 18,
  }
});

export default Head;
