import { Stack } from 'expo-router';

const Layout = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="pokemon" />
  </Stack>
);

export default Layout;
