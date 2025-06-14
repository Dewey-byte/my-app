// app/_layout.js
import { Slot, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';

export default function Layout() {
  const segments = useSegments();

  // Get the current route segment (e.g. 'home', 'login', 'signup')
  const currentRoute = segments[segments.length - 1];

  // Screens where BottomNavigation should be hidden
  const hideBottomNav = ['home', 'login', 'signup'];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Slot />
        </View>

        {/* Show BottomNavigation only when not on home, login, or signup */}
        {!hideBottomNav.includes(currentRoute) && <BottomNavigation />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
});
