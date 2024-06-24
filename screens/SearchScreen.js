import React, { useCallback, useState } from 'react';
import { View, FlatList, Image, RefreshControl, Text } from 'react-native';
import SearchComponent from '../components/SearchInput';
import { useFocusEffect } from '@react-navigation/native';
import AddToFavourite from '../components/AddtoFavorites';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleSearchResults = (results) => {
    setPhotos(results);
  };

  const loadFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(existingFavorites ? JSON.parse(existingFavorites) : []);
    } catch (error) {
      console.log('Failed to load favorites');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={{ width: '50%', padding: 6 }}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: item.url_s }}
          style={{
            width: '100%',
            height: 150,
            borderRadius: 10,
          }}
        />
        <AddToFavourite
          photo={item}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </View>
      <Text style={{ fontSize: 15, textAlign: 'center' }}>{item?.title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <SearchComponent onSearchResults={handleSearchResults} />
      <FlatList
        style={{ flex: 1, padding: 10 }}
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default SearchScreen;
