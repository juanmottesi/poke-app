import { Stack } from 'expo-router';

const Layout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="[name]" />
    <Stack.Screen name="movesModal" options={{ presentation: 'transparentModal' }} />
  </Stack>
);

export default Layout;
