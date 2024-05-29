import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type StatProps = {
  icon: ReactNode;
  name: string;
  value: string | number;
}

const Stat = ({ icon, name, value }: StatProps) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      {icon}
      <Text style={styles.name}>{name}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default Stat;
