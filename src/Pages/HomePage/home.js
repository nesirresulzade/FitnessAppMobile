import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Carousel from 'react-native-reanimated-carousel'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './home.module'

export default function Home({ navigation }) {
  const exerciseData = [
    { name: 'back', image: require('../../../assets/imgs/home1.avif') },
    { name: 'cardio', image: require('../../../assets/imgs/home3.jpeg') },
    { name: 'chest', image: require('../../../assets/imgs/home2.jpeg') },
    { name: 'legs', image: require('../../../assets/imgs/home1.avif') },
  ]

  const handleCardPress = (exercise) => {
    navigation.navigate('DetailsPage', { exerciseData: exercise })
  }
  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitleGrey}>READY TO</Text>
            <Text style={styles.headerTitleRed}>WORKOUT</Text>
          </View>
          <View style={styles.headerActions}>
            <Image source={require('../../../assets/imgs/home1.avif')} style={styles.avatar} />
            <TouchableOpacity style={styles.bellButton}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner Carousel */}
        <Carousel
          width={Dimensions.get('window').width - 32}
          height={200}
          style={{ alignSelf: 'center' }}
          loop
          autoPlay
          autoPlayInterval={2800}
          scrollAnimationDuration={800}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 60,
            parallaxAdjacentItemScale: 0.8,
          }}
          data={[
            require('../../../assets/imgs/home2.jpeg'),
            require('../../../assets/imgs/home1.avif'),
            require('../../../assets/imgs/home3.jpeg'),
          ]}
          renderItem={({ item }) => (
            <View style={styles.bannerWrapper}>
              <Image source={item} style={styles.banner} resizeMode="cover" />
            </View>
          )}
        />

        {/* Section title */}
        <Text style={styles.sectionTitle}>Exercises</Text>

        {/* Exercise grid */}
        <View style={styles.grid}>
          {exerciseData.map((exercise, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.card} 
              activeOpacity={0.85}
              onPress={() => handleCardPress(exercise)}
            >
              <Image source={exercise.image} style={styles.cardImage} />
              <LinearGradient
                colors={[ 'transparent', 'rgba(0,0,0,0.9)' ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.cardGradient}
              >
                <Text style={styles.cardLabel}>{exercise.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}