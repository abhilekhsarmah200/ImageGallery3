import React, { useState, useCallback } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      if (existingFavorites) {
        setFavorites(JSON.parse(existingFavorites));
      }
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const removeFromFavorites = async (photoId) => {
    try {
      const updatedFavorites = favorites.filter(
        (photo) => photo.id !== photoId
      );

      setFavorites(updatedFavorites);
      Toast.show({
        type: 'success',
        text1: 'Removed from Favorites',
        visibilityTime: 1000,
      });
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to remove from favorites', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ width: '50%', padding: 6 }}>
            <Image
              source={{ uri: item.url_s }}
              style={{
                width: '100%',
                height: 150,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontSize: 15, textAlign: 'center' }}>
              {item?.title}
            </Text>

            <TouchableOpacity
              onPress={() => removeFromFavorites(item.id)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: 5,
                borderRadius: 15,
              }}
            >
              <Ionicons name='trash' size={24} color={'red'} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Toast style={{ zIndex: 1 }} />
    </View>
  );
};

export default FavoritesScreen;
