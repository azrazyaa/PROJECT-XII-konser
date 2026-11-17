import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#552898ff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={typeof color === 'string' ? color : '#666666'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={typeof color === 'string' ? color : '#666666'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={typeof color === 'string' ? color : '#666666'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="my-tickets"
        options={{
          title: 'My Tickets',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket" color={typeof color === 'string' ? color : '#666666'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={typeof color === 'string' ? color : '#666666'} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}


