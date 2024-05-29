import { StyleSheet, Text, View } from "react-native";

type EmptyListComponentProps = {
  text: string;
};

const EmptyListComponent = ({ text }: EmptyListComponentProps) => (
  <View style={styles.emptyComponent}>
    <Text style={styles.emptyText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyComponent: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  }
});

export default EmptyListComponent;
