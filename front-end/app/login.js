import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useRouter } from 'expo-router';
const router = useRouter();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
    } else {
      fetch('http://192.168.254.104:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");
        const data = isJson ? await res.json() : {};
  
        if (res.ok && data.access_token) {
          Alert.alert('Success', 'Login successful!');
          router.replace('/feed');
        } else {
          Alert.alert('Error', data.message || 'Invalid credentials or server error');
        }
      })
      .catch((err) => {
        console.log('Login response:', data);

        Alert.alert('Error', 'An error occurred during login');
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

      <Text style={styles.title}>Login</Text>

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

      <Button title="Log In" onPress={handleLogin} />

      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.signupLink}>
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
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
  signupLink: { marginTop: 20, alignItems: 'center' },
  signupText: { color: '#fff', fontWeight: 'bold' },
});
