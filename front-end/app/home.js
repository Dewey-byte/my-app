import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,  } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


export default function Home() {

  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    
    // Fetch from backend
    fetch('http://172.20.10.7:5000/') // Replace with your actual IP
      .then((res) => res.json())
      .then((data) => {
        setBackendMessage(data.status);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching from backend:', err);
        setBackendMessage('Failed to connect to backend');
        setLoading(false);
      });
  }, []);

  
  // Full-screen loading screen
  if (loading) {
    return (
      <LinearGradient colors={['#00o000']} style={styles.loadingContainer}>
       <Text style={{ color: '#fff', marginTop: 10 }}>Loading...</Text>
      </LinearGradient>
    );
  }

  // Main UI
  return (
    <LinearGradient colors={['#000000']} style={styles.container}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />

      <Text style={styles.heading}>DICK</Text>
      <Text style={styles.subheading}>Start your journey by logging in or signing up</Text>

      <Text style={{ color: '#fff', marginBottom: 20 }}>{backendMessage}</Text>

      <View style={styles.buttonContainer}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Link>
        <View style={{ height: 12 }} />
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  gif: {
    width: 120,
    height: 120,
    marginBottom: -30,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  subheading: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
