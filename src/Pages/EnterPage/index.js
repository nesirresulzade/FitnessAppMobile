import React, { useEffect } from 'react'
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSpring,
  interpolate
} from 'react-native-reanimated'
import styles from './index.module.js'

export default function Index({ navigation }) {
  // Animasiya dəyişənləri
  const titleOpacity = useSharedValue(0)
  const titleTranslateY = useSharedValue(50)
  const subtitleOpacity = useSharedValue(0)
  const subtitleTranslateY = useSharedValue(30)
  const buttonOpacity = useSharedValue(0)
  const buttonScale = useSharedValue(0.8)
  const backgroundScale = useSharedValue(1.1)

  // Animasiyaları başlat
  useEffect(() => {
    // Background zoom animasiyası
    backgroundScale.value = withTiming(1, { duration: 1000 })
    
    // Title animasiyası
    titleOpacity.value = withDelay(500, withTiming(1, { duration: 800 }))
    titleTranslateY.value = withDelay(500, withSpring(0, { damping: 15, stiffness: 100 }))
    
    // Subtitle animasiyası
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 600 }))
    subtitleTranslateY.value = withDelay(800, withSpring(0, { damping: 15, stiffness: 100 }))
    
    // Button animasiyası
    buttonOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }))
    buttonScale.value = withDelay(1200, withSpring(1, { damping: 15, stiffness: 100 }))
  }, [])

  // Animasiya stilləri
  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backgroundScale.value }]
  }))

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }]
  }))

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }]
  }))

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }]
  }))

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent hidden={false} />
      
      {/* Background Image */}
      <Animated.Image
        source={require('../../../assets/imgs/fitness-aktivite-image.png')}
        style={[styles.backgroundImage, backgroundAnimatedStyle]}
        resizeMode="cover"
      />
      
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
        style={styles.gradientOverlay}
      >
        {/* Content */}
        <View style={styles.content}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Animated.Text style={[styles.title, titleAnimatedStyle]}>
              <Text style={styles.titleWhite}>Best </Text>
              <Text style={styles.titleRed}>Workouts</Text>
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>For you</Animated.Text>
          </View>

          {/* Get Started Button */}
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity 
              style={styles.getStartedButton}
              onPress={() => navigation.navigate('LoginPage')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
