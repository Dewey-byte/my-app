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
        const response = await fetch('http://172.20.10.7:5000/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log('Fetched posts:', data);
        Alert.alert('Error', 'Could not load feed');
      }
    };

    fetchPosts();
  }, []);

  // Like/unlike handler
  const handleLike = async (postId) => {
    try {
      await fetch(`http://172.20.10.7:5000/posts/like/${postId}`, { method: 'POST' });  // ← no space
      // Optimistically update UI
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      ));
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not like post');
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.author}>{item.author || 'Unknown Author'}</Text>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}
      <Text style={styles.content}>{item.content || 'No content available'}</Text>
  
      <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
        <Text>❤️ {item.likes || 0} Likes</Text>
      </TouchableOpacity>
  
      <TouchableOpacity onPress={() => router.push(`/post/${item.id}`)}>
        <Text style={styles.commentLink}>💬 View Comments</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={renderPost}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#00000',
  },
  post: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 6,
  },
  content: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  likeButton: {
    marginBottom: 10,
  },
  commentLink: {
    color: '#4e4eff',
    fontWeight: '500',
  },
});
