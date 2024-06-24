// SearchStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const SearchStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Profile'
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default SearchStackNavigator;
