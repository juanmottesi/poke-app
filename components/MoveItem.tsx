import { StyleSheet, Text, View } from "react-native";

type MoveItemProps = {
  name: string;
}

const MoveItem = ({ name }: MoveItemProps) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    textTransform: 'capitalize',
  }
});

export default MoveItem;
