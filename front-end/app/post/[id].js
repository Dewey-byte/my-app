import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PostDetail() {
  const { id } = useLocalSearchParams(); // post ID from route
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://192.168.254.103:5000/posts/${id}`)
      .then(res => res.json())
      .then(setPost)
      .catch(console.error);

    fetch(`http://192.168.254.103:5000/posts/${id}/comments`)
      .then(res => res.json())
      .then(setComments)
      .catch(console.error);
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    fetch(`http://192.168.254.103:5000/posts/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: 'User1', // Replace with actual user from context/login
        text: newComment,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setComments([...comments, { user: 'User1', text: newComment }]);
        setNewComment('');
      })
      .catch(console.error);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {post && (
          <View style={styles.postContainer}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>By {post.author}</Text>
          </View>
        )}
        <Text style={styles.commentTitle}>Comments</Text>
        {comments.map((c, i) => (
          <View key={i} style={styles.comment}>
            <Text style={styles.commentUser}>{c.user}</Text>
            <Text style={styles.commentText}>{c.text}</Text>
          </View>
        ))}
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor="#888" // Placeholder color for dark theme
          value={newComment}
          onChangeText={setNewComment}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Post Comment" onPress={handleAddComment} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212', // Dark background
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    padding: 20,
  },
  postContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center text inside the post container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for title
    textAlign: 'center',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#BBBBBB', // Light gray text for author
    textAlign: 'center',
    marginBottom: 20,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for comment title
    marginBottom: 10,
    textAlign: 'center',
  },
  comment: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#1E1E1E', // Slightly lighter background for comments
    borderRadius: 8,
    width: '100%',
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#FF6B6B', // Red for usernames
    marginBottom: 5,
  },
  commentText: {
    color: '#E0E0E0', // Light gray text for comment content
  },
  input: {
    borderWidth: 1,
    borderColor: '#333', // Darker border for input
    backgroundColor: '#1E1E1E', // Dark background for input
    color: '#FFFFFF', // White text for input
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: { marginTop: 10 },
});
