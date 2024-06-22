import React, { useState, useEffect } from 'react';
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

const HomeScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const maxPagesToShow = 5;

  useEffect(() => {
    fetchPhotos();
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
        text2: `please check your internet connection!!`,
        autoHide: 3000,
      });
    } finally {
      setLoading(false);
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
              </View>
            )}
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
