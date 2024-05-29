import { Stack } from 'expo-router';
import { View } from 'react-native';

const Layout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="pokemon" />
  </Stack>
);

export default Layout;
