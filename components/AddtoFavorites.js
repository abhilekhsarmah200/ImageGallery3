// components/AddToFavourite.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddToFavourite = ({ photo, favorites, setFavorites }) => {
  const isFavorite = (photo) => {
    return favorites.some((item) => item.id === photo.id);
  };

  const toggleFavorite = async (photo) => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      const index = favorites.findIndex((item) => item.id === photo.id);

      if (index !== -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        Toast.show({
          type: 'success',
          text1: 'Removed from Favorites',
          visibilityTime: 1000,
        });
      } else {
        // Add to favorites
        favorites.push(photo);
        Toast.show({
          type: 'success',
          text1: 'Added to Favorites',
          visibilityTime: 1000,
        });
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setFavorites(favorites);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update favorites',
        text2: 'Please try again!',
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => toggleFavorite(photo)}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 15,
      }}
    >
      <Ionicons
        name='heart'
        size={24}
        color={isFavorite(photo) ? 'red' : 'white'}
      />
    </TouchableOpacity>
  );
};

export default AddToFavourite;
