// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavouriteScreen';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'blue' : 'black' }}>Home</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='home' size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='Search'
      component={SearchScreen}
      options={{
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'blue' : 'black' }}>Search</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='search' size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='Favorites'
      component={FavoritesScreen}
      options={{
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'blue' : 'black' }}>Favorites</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='heart' size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='Profile'
      component={ProfileScreen}
      options={{
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'blue' : 'black' }}>Profile</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='person' size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
