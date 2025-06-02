// app/reels.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

export default function Reels() {
  const [videos, setVideos] = useState([]); // State to store uploaded videos

  // Handle video selection and upload
  const handleSelectVideo = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to allow access to your media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedVideo = result.assets[0];

      // Prepare the video for upload
      const formData = new FormData();
      formData.append('video', {
        uri: selectedVideo.uri,
        name: 'video.mp4',
        type: 'video/mp4',
      });

      // Upload the video to the backend
      fetch('http://192.168.254.103:5000/upload-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          Alert.alert('Success', 'Video uploaded successfully!');
          setVideos((prevVideos) => [...prevVideos, selectedVideo]);
        })
        .catch((err) => {
          console.error('Video upload error:', err);
          Alert.alert('Error', 'Failed to upload video.');
        });
    }
  };

  // Render a single video item
  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
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

      {/* Upload Button */}
      <TouchableOpacity onPress={handleSelectVideo} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Video</Text>
      </TouchableOpacity>

      {/* List of Uploaded Videos */}
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
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
  uploadButton: {
    backgroundColor: '#4E9EFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  videoList: {
    paddingBottom: 20,
  },
  videoContainer: {
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 200,
  },
});