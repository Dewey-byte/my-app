// app/feed.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.254.104:5000/posts');
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
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.author}>{item.author}</Text>
          {item.image && (
            <Image
              source={{ uri: item.image }} // Use the image URL from the backend
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
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    color: '#FFFFFF', // White text for author
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
    color: '#E0E0E0', // Light gray text for content
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  likeButton: {
    color: '#FF6B6B', // Red for the heart emoji
    fontWeight: '500',
    fontSize: 16,
  },
  commentLink: {
    color: '#4E9EFF', // Blue for the comment button
    fontWeight: '500',
    fontSize: 16,
  },
});
