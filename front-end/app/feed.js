import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Dewey',
      content: 'BSIT 2nd Year.',
      image: require('../assets/bsit.jpg'),
      likes: 10,
      liked: false,
      showComments: false,
      comments: [],
      newComment: '',
    },
    {
      id: 2,
      author: 'KM',
      content: 'Too much Hype',
      image: require('../assets/rawr.png'),
      likes: 5,
      liked: false,
      showComments: false,
      comments: [],
      newComment: '',
    },
    {
      id: 3,
      author: 'Jase',
      content: 'Eatwell',
      image: require('../assets/eat.png'),
      likes: 5,
      liked: false,
      showComments: false,
      comments: [],
      newComment: '',
    },
    {
      id: 4,
      author: 'Sundy',
      content: 'WTH.',
      image: require('../assets/wth.png'),
      likes: 5,
      liked: false,
      showComments: false,
      comments: [],
      newComment: '',
    },
    {
      id: 5,
      author: 'Sherwin',
      content: '^.^',
      image: require('../assets/mf.jpg'),
      likes: 5,
      liked: false,
      showComments: false,
      comments: [],
      newComment: '',
    },
    {
      id: 6,
      author: 'KM',
      content: 'Posy.',
      image: require('../assets/posy.jpg'),
      likes: 5,
      liked: false,
      showComments: false,
      comments: [],
      newComment: '',
    },
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setNewPostImage(result.assets[0].uri);
    }
  };

  const handleAddPost = () => {
    if (!newPostContent.trim() && !newPostImage) {
      Alert.alert('Error', 'Post must contain text or an image.');
      return;
    }

    const newPost = {
      id: posts.length + 1,
      author: 'New User',
      content: newPostContent,
      image: newPostImage ? { uri: newPostImage } : null,
      likes: 0,
      liked: false,
      showComments: false,
      comments: [],
      newComment: '',
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleCommentSection = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleCommentChange = (postId, text) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, newComment: text } : post
      )
    );
  };

  const handleAddComment = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId && post.newComment.trim()) {
          return {
            ...post,
            comments: [...post.comments, post.newComment.trim()],
            newComment: '',
          };
        }
        return post;
      })
    );
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.author}>{item.author}</Text>
      {item.image && (
        <Image source={item.image} style={styles.image} />
      )}
      {item.content ? <Text style={styles.content}>{item.content}</Text> : null}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text style={styles.likeButton}>
            {item.liked ? '💖' : '🤍'} {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCommentSection(item.id)}>
          <Text style={styles.commentLink}>💬 Comment</Text>
        </TouchableOpacity>
      </View>

      {item.showComments && (
        <View style={styles.commentSection}>
          {item.comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>
              💬 {comment}
            </Text>
          ))}
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#888"
              value={item.newComment}
              onChangeText={(text) => handleCommentChange(item.id, text)}
            />
            <TouchableOpacity
              onPress={() => handleAddComment(item.id)}
              style={styles.commentPostButton}
            >
              <Text style={styles.commentPostButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        contentContainerStyle={styles.feedContent}
      />

      <View style={styles.newPostContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
          <Text style={styles.imagePickerButtonText}>🖼️</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.newPostInput}
          placeholder="Write a new post..."
          value={newPostContent}
          onChangeText={setNewPostContent}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.addPostButton} onPress={handleAddPost}>
          <Text style={styles.addPostButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  feedContent: {
    padding: 10,
    paddingBottom: 100,
  },
  newPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333',
    position: 'absolute',
    bottom: 2,
    width: '100%',
  },
  imagePickerButton: {
    marginRight: 8,
  },
  imagePickerButtonText: {
    fontSize: 22,
    color: '#4E9EFF',
  },
  newPostInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    color: '#FFFFFF',
    backgroundColor: '#121212',
    marginRight: 10,
  },
  addPostButton: {
    backgroundColor: '#4E9EFF',
    padding: 10,
    borderRadius: 8,
  },
  addPostButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  post: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1E1E1E',
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
  commentSection: {
    marginTop: 10,
  },
  commentText: {
    color: '#ccc',
    marginBottom: 4,
    fontSize: 14,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    padding: 8,
    color: '#fff',
    backgroundColor: '#121212',
    marginRight: 10,
  },
  commentPostButton: {
    backgroundColor: '#4E9EFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  commentPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
