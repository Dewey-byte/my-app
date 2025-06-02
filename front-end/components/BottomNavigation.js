// components/BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function BottomNavigation() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/feed')}>
        <Ionicons name="home" size={29} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/messages')}>
        <Ionicons name="chatbubble-outline" size={28} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/reels')}>
        <MaterialCommunityIcons name="movie-open-play" size={28} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Ionicons name="person-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    borderBottomWidth: 15,
    borderTopColor: '#333',
  },
});
