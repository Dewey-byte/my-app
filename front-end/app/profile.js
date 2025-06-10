import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import BottomNavigation from '../components/BottomNavigation'; // Import BottomNavigation

export default function Profile() {
  const [user] = useState({
    username: 'cd_fpv',
    bio: 'Photographer | Traveler | Dreamer',
    profilePicture:'http://192.168.254.103:5000/uploads/cool.jpg',
    posts: 29,
    followers: 334,
    following: 230,
  });

  const [posts] = useState(
    Array.from({ length: 12 }).map((_, i) => ({
      id: i.toString(),
      image: 'http://192.168.254.103:5000/uploads/cool.jpg',
    }))
  );

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileInfo}>
        <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
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
        numColumns={3} // Grid layout with 3 columns
        ListHeaderComponent={renderHeader} // Render the profile header as the list header
        contentContainerStyle={styles.postsContainer}
      />
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark theme background
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
    marginBottom: 16,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginRight: 16,
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
    fontSize: 18,
    marginTop: 70,
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    marginTop: 8,
  },
  bio: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 4,
    marginBottom: 16,
  },
  postsContainer: {
    paddingBottom: 40,
  },
  postContainer: {
    flex: 1,
    margin: 1, // Add spacing between grid items
  },
  postImage: {
    width: '100%',
    aspectRatio: 1, // Ensures the image is square
  },
});
