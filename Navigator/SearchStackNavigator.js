// SearchStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const SearchStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Search'
      component={SearchScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default SearchStackNavigator;
