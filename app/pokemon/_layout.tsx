import { Stack } from 'expo-router';

const Layout = () => (
  <Stack screenOptions={{ headerShown: true }}>
    <Stack.Screen name="[name]" />
    <Stack.Screen name="movesModal" options={{ presentation: 'transparentModal', headerShown: false }} />
  </Stack>
);

export default Layout;
