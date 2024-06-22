import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  RefreshControl,
  Text,
  FlatList,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FLICKR_API_URL =
  'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    loadCachedData();
    fetchPhotos();
  }, []);

  const loadCachedData = async () => {
    try {
      const cachedPhotos = await AsyncStorage.getItem('photos');
      if (cachedPhotos) {
        setPhotos(JSON.parse(cachedPhotos));
      }
    } catch (error) {
      console.error('Failed to load cached photos:', error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(FLICKR_API_URL);
      const fetchedPhotos = response.data.photos.photo.map(
        (photo) => photo.url_s
      );
      const cachedPhotos = await AsyncStorage.getItem('photos');

      if (JSON.stringify(fetchedPhotos) !== cachedPhotos) {
        setPhotos(fetchedPhotos);
        await AsyncStorage.setItem('photos', JSON.stringify(fetchedPhotos));
      }

      setOffline(false);
    } catch (error) {
      console.error('Failed to fetch photos: You are offline');
      setOffline(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPhotos().finally(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      {offline && (
        <Text style={styles.offlineText}>
          You are offline. Showing cached images.
        </Text>
      )}
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            alt={item?.title}
          />
        )}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '50%',
    height: 200,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },

  offlineText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'red',
  },
});

export default HomeScreen;
