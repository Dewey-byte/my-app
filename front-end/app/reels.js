import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Reels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const videoRefs = useRef([]);
  const animations = useRef({});

  const videos = [
    { id: 1, title: 'Good Vibes', uri: require('./assets/bro.mp4') },
    { id: 2, title: 'sigma dog', uri: require('./assets/cooldogy.mp4') },
    { id: 3, title: 'sheeesh', uri: require('./assets/dream.mp4') },
    { id: 4, title: 'putcha', uri: require('./assets/it.mp4') },
    { id: 5, title: 'Broom', uri: require('./assets/raider.mp4') },
  ];

  videos.forEach((_, index) => {
    if (!animations.current[index]) {
      animations.current[index] = new Animated.Value(1);
    }
  });

  const handleLike = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
    Animated.sequence([
      Animated.timing(animations.current[index], {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(animations.current[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    const index = viewableItems[0]?.index ?? 0;
    setCurrentIndex(index);

    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.playAsync();
        } else {
          video.pauseAsync();
        }
      }
    });
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const renderVideoItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={item.uri}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay={index === currentIndex}
        useNativeControls={false}
      />
      <View style={styles.overlay}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleLike(index)}>
            <Animated.View style={{ transform: [{ scale: animations.current[index] }] }}>
              <FontAwesome
                name="heart"
                size={28}
                color={liked[index] ? 'red' : 'white'}
              />
            </Animated.View>
            <Text style={styles.iconLabel}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="comment" size={28} color="white" />
            <Text style={styles.iconLabel}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="share" size={28} color="white" />
            <Text style={styles.iconLabel}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVideoItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.bottomNavWrapper}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    height: SCREEN_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    position: 'absolute',
    right: 10,
    bottom: 40,
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 25,
    alignItems: 'center',
  },
  iconLabel: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
