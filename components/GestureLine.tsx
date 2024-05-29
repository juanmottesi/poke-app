import { StyleSheet, View } from "react-native";

const GestureLine = () => (
  <View style={styles.container}>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  line: {
    height: 5,
    width: '20%',
    borderRadius: 4,
    backgroundColor: '#999',
  }
});

export default GestureLine;
