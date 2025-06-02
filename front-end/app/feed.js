// app/feed.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavigation from '../components/BottomNavigation'; // Import BottomNavigation

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.254.103:5000/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        Alert.alert('Error', 'Could not load feed');
      }
    };

    fetchPosts();
  }, []);

  // Like/unlike handler
  const handleLike = async (postId) => {
    try {
      await fetch(`http://192.168.254.104:5000/posts/like/${postId}`, { method: 'POST' });
      // Optimistically update UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Could not like the post');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.author}>{item.author}</Text>
            {item.image && (
              <Image
                source={{ uri:`http://192.168.254.103:5000/posts/${item.image}` }} // Use the image URL from the backend
                style={styles.image}
              />
            )}
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Text style={styles.likeButton}>❤️ {item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push(`/post/${item.id}`)}>
                <Text style={styles.commentLink}>💬 Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={styles.container}
      />
      <BottomNavigation /> {/* Add BottomNavigation here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212', // Dark background
    flex: 1,
    padding: 10,
  },
  post: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1E1E1E', // Darker card background
    borderRadius: 8,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  content: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
    color: '#E0E0E0',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    color: '#FF6B6B',
    fontWeight: '500',
    fontSize: 16,
  },
  commentLink: {
    color: '#4E9EFF',
    fontWeight: '500',
    fontSize: 16,
  },
});
