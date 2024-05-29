import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
}

const renderIcon = (name: string) => ({ focused }: TabBarIconProps) => {
  if (name === 'home') {
    return <Entypo name="home" size={24} color={focused ? 'red' : '#ccc'} />
  }
  if (name === 'search') {
    return <FontAwesome name="search" size={24} color={focused ? 'red' : '#ccc'} />
  }
  if (name === 'like') {
    return <AntDesign name="heart" size={24} color={focused ? 'red' : '#ccc'} />
  }
  return <AntDesign name="question" size={24} color={focused ? 'red' : '#ccc'} />
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ tabBarIcon: renderIcon('home'), tabBarShowLabel: false }} />
      <Tabs.Screen name="search" options={{ tabBarIcon: renderIcon('search'), tabBarShowLabel: false }} />
      <Tabs.Screen name="like" options={{ tabBarIcon: renderIcon('like'), tabBarShowLabel: false }} />
    </Tabs>
  );
}
