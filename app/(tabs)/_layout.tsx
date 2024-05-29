import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

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
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar, tabBarHideOnKeyboard: true }}>
      <Tabs.Screen name="home" options={{ tabBarIcon: renderIcon('home') }} />
      <Tabs.Screen name="search" options={{ tabBarIcon: renderIcon('search') }} />
      <Tabs.Screen name="like" options={{ tabBarIcon: renderIcon('like') }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
  }
})