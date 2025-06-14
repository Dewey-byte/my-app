import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const [user, setUser] = useState({
    username: 'cd_fpv',
    bio: 'Photographer | Traveler | Dreamer',
    profilePicture: require('../assets/profile.jpg'),
    posts: 29,
    followers: 334,
    following: 230,
  });

  const [posts] = useState(
    Array.from({ length: 12 }).map((_, i) => ({
      id: i.toString(),
      image: require('../assets/cool.jpg'),
    }))
  );

  // Request permission to access gallery
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need permission to access your gallery.');
      }
    })();
  }, []);

  const changeProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setUser((prev) => ({
          ...prev,
          profilePicture: { uri: result.assets[0].uri },
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={item.image} style={styles.postImage} />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={changeProfilePicture}>
          <Image source={user.profilePicture} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.postsContainer}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4E9EFF',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  statLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 8,
  },
  bio: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  postsContainer: {
    paddingBottom: 30,
  },
  postContainer: {
    flex: 1,
    margin: 1,
  },
  postImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
});
