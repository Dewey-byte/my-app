import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function BottomNavigation() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/feed')}>
        <Ionicons name="home" size={29} color="white" />
        {/* Optional label */}
        {/* <Text style={styles.label}>Home</Text> */}
      </TouchableOpacity>

      {/* ✅ Modified only this icon */}
      <TouchableOpacity onPress={() => router.push('/camera')}>
        <Ionicons name="camera-outline" size={28} color="white" />
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
    paddingVertical: 20,
    borderTopColor: '#333',
    borderBottomWidth: 30,
  },
  label: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
});
