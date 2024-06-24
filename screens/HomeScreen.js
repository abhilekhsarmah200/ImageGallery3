// screens/HomeScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Image,
  RefreshControl,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AddToFavourite from '../components/AddtoFavorites'; // Import the new component

const HomeScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const maxPagesToShow = 5;

  useEffect(() => {
    fetchPhotos();
    loadFavorites();
  }, [page]);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=cat&page=${page}&per_page=10`
      );
      setPhotos(response.data.photos.photo);
      setTotalPages(response?.data?.photos?.pages);
    } catch (error) {
      setError('Network error, please try again.');
      Toast.show({
        type: 'error',
        text1: 'Network error',
        text2: 'Please check your internet connection!',
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(existingFavorites ? JSON.parse(existingFavorites) : []);
    } catch (error) {
      console.log('Failed to load favorites');
    }
  };

  const handleRetry = () => {
    setError(null);
    setPage(1);
    fetchPhotos();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageSelect = (pageNumber) => {
    setPage(pageNumber);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    setPage(1);
    fetchPhotos().finally(() => setRefreshing(false));
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
      {loading && page === 1 ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <>
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
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handlePageSelect={handlePageSelect}
            maxPagesToShow={maxPagesToShow}
          />
        </>
      )}
      {error && (
        <View
          style={{
            position: 'absolute',
            zIndex: 9,
            bottom: 10,
            left: 0,
            right: 0,
          }}
        >
          <TouchableOpacity
            onPress={handleRetry}
            style={{
              backgroundColor: 'red',
              padding: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      <Toast style={{ zIndex: 1 }} />
    </View>
  );
};

export default HomeScreen;
