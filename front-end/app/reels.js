// app/reels.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';

export default function Reels() {
  const [videos] = useState([
    {
      id: 1,
      title: 'Nature Reel',
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4', // Static video URL
    },
    {
      id: 2,
      title: 'City Lights',
      uri: 'https://www.w3schools.com/html/movie.mp4', // Static video URL
    },
    {
      id: 3,
      title: 'Ocean Waves',
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4', // Static video URL
    },
    {
      id: 4,
      title: 'Mountain View',
      uri: 'https://www.w3schools.com/html/movie.mp4', // Static video URL
    },
    {
      id: 5,
      title: 'Forest Walk',
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4', // Static video URL
    },
  ]);

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <Video
        source={{ uri: item.uri }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reels</Text>

      {/* List of Static Videos */}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVideoItem}
        contentContainerStyle={styles.videoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  videoList: {
    paddingBottom: 20,
  },
  videoContainer: {
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});