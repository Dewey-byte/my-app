import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Link, useFocusEffect, useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter(); // ✅ moved inside
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
    } else {
      fetch('http://192.168.254.103:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'User registered successfully') {
          Alert.alert('Success', 'Sign up successful!');
          router.replace('/feed');
        } else {
          Alert.alert('Error', data.message || 'Signup failed');
        }
      })
      .catch((err) => {
        console.error('SignUp error:', err);
        Alert.alert('Error', 'An error occurred during sign up');
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }]}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
