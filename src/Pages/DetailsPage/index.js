import React, { useCallback, useMemo, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, FlatList, ScrollView } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LinearGradient } from 'expo-linear-gradient'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import styles from './index.module.js'

export default function DetailsPage({ route, navigation }) {
  const insets = useSafeAreaInsets();
  
  // Bottom sheet state və ref
  const bottomSheetModalRef = useRef(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  
  // Default məlumatlar - API olmadığına görə hər şeyi burada yerləşdiririk
  const exerciseData = route.params?.exerciseData || { 
    name: 'Back', 
    image: require('../../../assets/imgs/fitness-aktivite-image.png') 
  };

  // Bütün məşq kateqoriyaları və məşqləri - ətraflı məlumatlarla
  const allExercises = {
    back: [
      { 
        id: 'back-1', 
        name: 'Pull-ups', 
        image: require('../../../assets/imgs/home1.avif'),
        description: 'Hanging from a bar and lifting your own body weight. Strengthens back muscles.',
        sets: '3-4 sets',
        reps: '8-12 reps',
        difficulty: 'Intermediate',
        muscles: 'Back, Biceps, Shoulders'
      },
      { 
        id: 'back-2', 
        name: 'Bent Over Row', 
        image: require('../../../assets/imgs/home2.jpeg'),
        description: 'Pulling motion with dumbbells while bent over. Targets back muscles.',
        sets: '3-4 sets',
        reps: '10-15 reps',
        difficulty: 'Beginner',
        muscles: 'Back, Biceps, Shoulders'
      },
      { 
        id: 'back-3', 
        name: 'Lat Pulldown', 
        image: require('../../../assets/imgs/home3.jpeg'),
        description: 'Pulling motion from top to bottom. Works wide back muscles.',
        sets: '3-4 sets',
        reps: '10-12 reps',
        difficulty: 'Beginner',
        muscles: 'Back, Biceps'
      },
      { 
        id: 'back-4', 
        name: 'Seated Row', 
        image: require('../../../assets/imgs/home4.jpg'),
        description: 'Pulling motion while seated. Strengthens back muscles.',
        sets: '3-4 sets',
        reps: '12-15 reps',
        difficulty: 'Beginner',
        muscles: 'Back, Biceps, Shoulders'
      },
      { 
        id: 'back-5', 
        name: 'T-Bar Row', 
        image: require('../../../assets/imgs/home5.jpeg'),
        description: 'Pulling motion with T-bar. Strengthens back muscles.',
        sets: '3-4 sets',
        reps: '8-12 reps',
        difficulty: 'Intermediate',
        muscles: 'Back, Biceps'
      },
      { 
        id: 'back-6', 
        name: 'Cable Row', 
        image: require('../../../assets/imgs/home6.jpeg'),
        description: 'Pulling motion with cable. Targets back muscles.',
        sets: '3-4 sets',
        reps: '10-15 reps',
        difficulty: 'Beginner',
        muscles: 'Back, Biceps, Shoulders'
      },
    ],
    legs: [
      { 
        id: 'legs-1', 
        name: 'Squats', 
        image: require('../../../assets/imgs/home1.avif'),
        description: 'Basic leg movement. Works all leg muscles.',
        sets: '3-4 sets',
        reps: '12-20 reps',
        difficulty: 'Beginner',
        muscles: 'Quadriceps, Glutes, Hamstrings'
      },
      { 
        id: 'legs-2', 
        name: 'Lunges', 
        image: require('../../../assets/imgs/home2.jpeg'),
        description: 'Stepping movement. Strengthens leg muscles.',
        sets: '3-4 sets',
        reps: '10-15 each leg',
        difficulty: 'Beginner',
        muscles: 'Quadriceps, Glutes, Calves'
      },
      { 
        id: 'legs-3', 
        name: 'Deadlifts', 
        image: require('../../../assets/imgs/home3.jpeg'),
        description: 'Lifting weight from the ground. Strengthens entire body.',
        sets: '3-4 sets',
        reps: '5-8 reps',
        difficulty: 'Advanced',
        muscles: 'Hamstrings, Glutes, Back'
      },
      { 
        id: 'legs-4', 
        name: 'Calf Raises', 
        image: require('../../../assets/imgs/home4.jpg'),
        description: 'Rising on toes movement. Strengthens calf muscles.',
        sets: '3-4 sets',
        reps: '15-25 reps',
        difficulty: 'Beginner',
        muscles: 'Calves'
      },
      { 
        id: 'legs-5', 
        name: 'Leg Press', 
        image: require('../../../assets/imgs/home5.jpeg'),
        description: 'Leg pressing movement on machine. Strengthens leg muscles.',
        sets: '3-4 sets',
        reps: '12-15 reps',
        difficulty: 'Beginner',
        muscles: 'Quadriceps, Glutes'
      },
      { 
        id: 'legs-6', 
        name: 'Leg Curl', 
        image: require('../../../assets/imgs/home6.jpeg'),
        description: 'Leg curling movement. Targets back leg muscles.',
        sets: '3-4 sets',
        reps: '12-15 reps',
        difficulty: 'Beginner',
        muscles: 'Hamstrings'
      },
    ],
    chest: [
      { 
        id: 'chest-1', 
        name: 'Push-ups', 
        image: require('../../../assets/imgs/home1.avif'),
        description: 'Pushing movement on the ground. Strengthens chest muscles.',
        sets: '3-4 sets',
        reps: '10-20 reps',
        difficulty: 'Beginner',
        muscles: 'Chest, Triceps, Shoulders'
      },
      { 
        id: 'chest-2', 
        name: 'Bench Press', 
        image: require('../../../assets/imgs/home2.jpeg'),
        description: 'Lying down weight pressing movement. Strengthens chest muscles.',
        sets: '3-4 sets',
        reps: '8-12 reps',
        difficulty: 'Intermediate',
        muscles: 'Chest, Triceps, Shoulders'
      },
      { 
        id: 'chest-3', 
        name: 'Incline Press', 
        image: require('../../../assets/imgs/home3.jpeg'),
        description: 'Upward angle pressing movement. Targets upper chest muscles.',
        sets: '3-4 sets',
        reps: '8-12 reps',
        difficulty: 'Intermediate',
        muscles: 'Upper Chest, Triceps'
      },
      { 
        id: 'chest-4', 
        name: 'Dumbbell Flyes', 
        image: require('../../../assets/imgs/home4.jpg'),
        description: 'Opening movement with dumbbells. Isolates chest muscles.',
        sets: '3-4 sets',
        reps: '10-15 reps',
        difficulty: 'Beginner',
        muscles: 'Chest'
      },
      { 
        id: 'chest-5', 
        name: 'Chest Dips', 
        image: require('../../../assets/imgs/home5.jpeg'),
        description: 'Chest movement on bars. Strengthens chest and triceps muscles.',
        sets: '3-4 sets',
        reps: '8-12 reps',
        difficulty: 'Advanced',
        muscles: 'Chest, Triceps'
      },
      { 
        id: 'chest-6', 
        name: 'Cable Fly', 
        image: require('../../../assets/imgs/home6.jpeg'),
        description: 'Opening movement with cable. Isolates chest muscles.',
        sets: '3-4 sets',
        reps: '12-15 reps',
        difficulty: 'Beginner',
        muscles: 'Chest'
      },
    ],
    cardio: [
      { 
        id: 'cardio-1', 
        name: 'Jumping Jacks', 
        image: require('../../../assets/imgs/home1.avif'),
        description: 'Jumping movement in place. Perfect for general cardio.',
        sets: '3-4 sets',
        reps: '30-60 seconds',
        difficulty: 'Beginner',
        muscles: 'Full Body'
      },
      { 
        id: 'cardio-2', 
        name: 'Burpees', 
        image: require('../../../assets/imgs/home2.jpeg'),
        description: 'Full body movement. Perfect for cardio and strength.',
        sets: '3-4 sets',
        reps: '10-15 reps',
        difficulty: 'Advanced',
        muscles: 'Full Body'
      },
      { 
        id: 'cardio-3', 
        name: 'Mountain Climbers', 
        image: require('../../../assets/imgs/home3.jpeg'),
        description: 'Running movement on the ground. For cardio and core strength.',
        sets: '3-4 sets',
        reps: '30-60 seconds',
        difficulty: 'Intermediate',
        muscles: 'Core, Legs, Shoulders'
      },
      { 
        id: 'cardio-4', 
        name: 'High Knees', 
        image: require('../../../assets/imgs/home4.jpg'),
        description: 'High knee lifting movement. Effective for cardio.',
        sets: '3-4 sets',
        reps: '30-60 seconds',
        difficulty: 'Beginner',
        muscles: 'Legs, Core'
      },
      { 
        id: 'cardio-5', 
        name: 'Running', 
        image: require('../../../assets/imgs/home5.jpeg'),
        description: 'Running movement. One of the best cardio exercises.',
        sets: '1 set',
        reps: '20-30 minutes',
        difficulty: 'Intermediate',
        muscles: 'Full Body'
      },
      { 
        id: 'cardio-6', 
        name: 'Jump Rope', 
        image: require('../../../assets/imgs/home6.jpeg'),
        description: 'Rope jumping movement. Perfect for cardio and coordination.',
        sets: '3-4 sets',
        reps: '1-2 minutes',
        difficulty: 'Intermediate',
        muscles: 'Legs, Core, Shoulders'
      },
    ],
  };

  // Click olunan hərəkətə görə məşqləri gətir
  const exercises = allExercises[exerciseData.name] || []

  // Bottom sheet funksionallığı
  const handlePresentModalPress = useCallback((exercise) => {
    setSelectedExercise(exercise);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={[styles.header, { top: insets.top }] }>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{exerciseData.name}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image 
          source={exerciseData.image} 
          style={styles.heroImage} 
          resizeMode="cover" 
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.heroGradient}
        >
          <Text style={styles.heroTitle}>{exerciseData.name}</Text>
        </LinearGradient>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
          <Text style={styles.sectionTitle}>Exercises</Text>
        </View>
        
        <FlatList
          contentContainerStyle={styles.listContent}
          data={exercises}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.exerciseCard}
                  onPress={() => handlePresentModalPress(item)}
                  activeOpacity={0.8}
                >
              <Image source={item.image} style={styles.exerciseImage} resizeMode="cover" />
              <Text style={styles.exerciseName} numberOfLines={1}>{item.name}</Text>
                </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>

        {/* Bottom Sheet Modal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: '#1a1a1a' }}
          handleIndicatorStyle={{ backgroundColor: '#fff' }}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            {selectedExercise && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Exercise Image */}
                <View style={styles.exerciseDetailImageContainer}>
                  <Image 
                    source={selectedExercise.image} 
                    style={styles.exerciseDetailImage} 
                    resizeMode="cover" 
                  />
                </View>

                {/* Exercise Info */}
                <View style={styles.exerciseInfoContainer}>
                  <Text style={styles.exerciseDetailName}>{selectedExercise.name}</Text>
                  
                  {/* Description */}
                  <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Description</Text>
                    <Text style={styles.infoText}>{selectedExercise.description}</Text>
                  </View>

                  {/* Exercise Details */}
                  <View style={styles.exerciseDetails}>
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="repeat" size={20} color="#ff6b35" />
                      <Text style={styles.detailLabel}>Reps:</Text>
                      <Text style={styles.detailValue}>{selectedExercise.reps}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="format-list-numbered" size={20} color="#ff6b35" />
                      <Text style={styles.detailLabel}>Sets:</Text>
                      <Text style={styles.detailValue}>{selectedExercise.sets}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="speedometer" size={20} color="#ff6b35" />
                      <Text style={styles.detailLabel}>Difficulty:</Text>
                      <Text style={[styles.detailValue, { 
                        color: selectedExercise.difficulty === 'Beginner' ? '#4CAF50' : 
                               selectedExercise.difficulty === 'Intermediate' ? '#FF9800' : '#F44336'
                      }]}>
                        {selectedExercise.difficulty}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="arm-flex" size={20} color="#ff6b35" />
                      <Text style={styles.detailLabel}>Muscles:</Text>
                      <Text style={styles.detailValue}>{selectedExercise.muscles}</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}