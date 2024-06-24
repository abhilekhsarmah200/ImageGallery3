import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'Abhilekh Sarmah',
    email: 'abhilekhsarmah200@gmail.com',
    profilePicture:
      'https://res.cloudinary.com/dwkajs0ca/image/upload/v1716280107/Abhilekhz/ugu7aigjsszagmy8kqxe.jpg', // Placeholder image URL for profile picture
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userDetails.profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.profileName}>{userDetails.name}</Text>
        <Text style={styles.profileEmail}>{userDetails.email}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
});
