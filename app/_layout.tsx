import { Stack } from 'expo-router';

const Layout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="pokemon" />
  </Stack>
);

export default Layout;
