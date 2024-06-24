// CustomDrawerContent.js
import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text style={{ fontSize: 24, margin: 10 }}>Image Gallery</Text>
      </View>
      <DrawerItem
        label='Home'
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label='Search'
        onPress={() => props.navigation.navigate('Search')}
      />
      <DrawerItem
        label='Favorites'
        onPress={() => props.navigation.navigate('Favorites')}
      />
      <DrawerItem
        label='Profile'
        onPress={() => props.navigation.navigate('Profile')}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
