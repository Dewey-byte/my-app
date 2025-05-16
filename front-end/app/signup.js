import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useRouter } from 'expo-router';

const router = useRouter();

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
    } else {
      // Send signup request to backend
      fetch('http://172.20.10.7:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,  // Use the email as the username
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#b01eff' },
  logo: { width: 200, height: 200, alignSelf: 'center', marginBottom: -5 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    height: 50,
    borderColor: '#ffff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#A9A9A9',
  },
  loginLink: { marginTop: 20, alignItems: 'center' },
  loginText: { color: '#ffff', fontWeight: 'bold' },
});
