import { Stack } from 'expo-router';

import PokemonLikedProvider from '@/context/PokemonLiked';

const Layout = () => (
  <PokemonLikedProvider>
    <Stack screenOptions={{ headerShown: false }} />
  </PokemonLikedProvider>
);

export default Layout;
