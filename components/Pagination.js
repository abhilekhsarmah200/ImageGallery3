import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Pagination = ({
  page,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageSelect,
  maxPagesToShow,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <TouchableOpacity
          onPress={handlePrevPage}
          disabled={page === 1}
          style={{
            backgroundColor: page === 1 ? 'grey' : 'blue',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white' }}>Previous</Text>
        </TouchableOpacity>
        {pages.slice(page - 1, page - 1 + maxPagesToShow).map((pageNumber) => (
          <TouchableOpacity
            key={pageNumber}
            onPress={() => handlePageSelect(pageNumber)}
            style={{
              backgroundColor: pageNumber === page ? 'blue' : 'grey',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: 'white' }}>{pageNumber}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={page === totalPages}
          style={{
            backgroundColor: page === totalPages ? 'grey' : 'blue',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;
