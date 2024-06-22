import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const SearchComponent = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      onSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${query}`
      );
      const photosData = response.data.photos.photo;
      onSearchResults(photosData);
      if (photosData.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Search Not Found',
          text2: `No results found for '${query}'`,
          autoHide: 3000,
        });
      }
    } catch (error) {
      setError('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSearch();
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleSearch().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder='Search for photos'
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title='Search' onPress={handleSearch} />
      {loading && <ActivityIndicator size='large' color='#0000ff' />}
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

export default SearchComponent;
