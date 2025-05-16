import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PostDetail() {
  const { id } = useLocalSearchParams(); // post ID from route
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://192.168.254.104:5000/posts/${id}`) // You'll need this backend route
      .then(res => res.json())
      .then(setPost)
      .catch(console.error);

    fetch(`http://192.168.254.104:5000/posts/${id}/comments`)
      .then(res => res.json())
      .then(setComments)
      .catch(console.error);
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    fetch(`http://192.168.254.104:5000/posts/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: 'User1', // Replace with actual user from context/login
        text: newComment,
      }),
    })
      .then(() => {
        setComments([...comments, { user: 'User1', text: newComment }]);
        setNewComment('');
      })
      .catch(console.error);
  };

  if (!post) return <Text style={styles.loading}>Loading post...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post.content}</Text>
      <Text style={styles.author}>Posted by: {post.author}</Text>
      <Text style={styles.likes}>Likes: {post.likes}</Text>

      <View style={styles.commentBox}>
        <Text style={styles.commentTitle}>Comments</Text>
        {comments.map((c, i) => (
          <View key={i} style={styles.comment}>
            <Text style={styles.commentUser}>{c.user}</Text>
            <Text>{c.text}</Text>
          </View>
        ))}
      </View>

      <TextInput
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
        style={styles.input}
      />
      <Button title="Post Comment" onPress={handleAddComment} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  loading: { textAlign: 'center', marginTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  author: { fontSize: 14, color: 'gray', marginBottom: 5 },
  likes: { marginBottom: 20 },
  commentBox: { marginTop: 20 },
  commentTitle: { fontSize: 18, marginBottom: 10 },
  comment: { backgroundColor: '#eee', padding: 10, marginBottom: 5, borderRadius: 5 },
  commentUser: { fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
