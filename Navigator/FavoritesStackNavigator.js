// FavoritesStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/FavouriteScreen';

const Stack = createStackNavigator();

const FavoritesStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Favorites'
      component={FavoritesScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default FavoritesStackNavigator;
