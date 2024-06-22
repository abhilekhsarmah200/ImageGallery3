import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
