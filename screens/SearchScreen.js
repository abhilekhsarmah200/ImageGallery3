import React, { useState } from 'react';
import { View, FlatList, Image, RefreshControl, Text } from 'react-native';
import SearchComponent from '../components/SearchInput';

const SearchScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearchResults = (results) => {
    setPhotos(results);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPhotos([]);
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <SearchComponent onSearchResults={handleSearchResults} />
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
              alt={item?.title}
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
    </View>
  );
};

export default SearchScreen;
