// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNavigator from '../Navigator/HomeStackNavigator';
import SearchStackNavigator from '../Navigator/SearchStackNavigator';
import FavoritesStackNavigator from '../Navigator/FavoritesStackNavigator';
import ProfileStackNavigator from '../Navigator/ProfileStackNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent'; // Optional: Custom drawer content component

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name='Image Gallery'
      component={HomeStackNavigator}
      options={{ drawerLabel: 'Home' }}
    />
    <Drawer.Screen
      name='SearchTab'
      component={SearchStackNavigator}
      options={{ drawerLabel: 'Search' }}
    />
    <Drawer.Screen
      name='FavoritesTab'
      component={FavoritesStackNavigator}
      options={{ drawerLabel: 'Favorites' }}
    />
    <Drawer.Screen
      name='ProfileTab'
      component={ProfileStackNavigator}
      options={{ drawerLabel: 'Profile' }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
