import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Dimensions, Modal, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Carousel from 'react-native-reanimated-carousel'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './home.module'
import { signOut, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth'
import { auth, db } from '../../../firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore'
import Toast from 'react-native-toast-message'

export default function Home({ navigation }) {
  const [profile, setProfile] = useState(null)
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changing, setChanging] = useState(false)

  useEffect(() => {
    if (!auth.currentUser) return
    const unsub = onSnapshot(doc(db, 'users', auth.currentUser.uid), (snap) => {
      setProfile(snap.exists() ? snap.data() : null)
    })
    return unsub
  }, [])
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isProfileModalVisible}
        pointerEvents={isProfileModalVisible ? 'none' : 'auto'}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitleGrey}>READY TO</Text>
            <Text style={styles.headerTitleRed}>WORKOUT</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsProfileModalVisible(true)
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              {profile?.photoURL || auth.currentUser?.photoURL ? (
                <Image source={{ uri: profile?.photoURL || auth.currentUser?.photoURL }} style={styles.avatar} />
              ) : (
                <Image source={require('../../../assets/imgs/home1.avif')} style={styles.avatar} />
              )}
              {!!profile?.displayName && (
                <Text style={styles.nameLabel} numberOfLines={1}>
                  {profile.displayName}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellButton} onPress={() => signOut(auth)}>
              <MaterialCommunityIcons name="logout" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner Carousel */}
        <Carousel
          width={Dimensions.get('window').width - 32}
          height={200}
          style={{ alignSelf: 'center' }}
          loop
          autoPlay={!isProfileModalVisible}
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

      {/* Profile Overlay (absolute) */}
      {isProfileModalVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            elevation: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsProfileModalVisible(false)}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <View style={{ width: '90%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 12, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Profil</Text>
            <View style={{ rowGap: 10 }}>
              <View>
                <Text style={{ color: '#888', marginBottom: 4 }}>Ad</Text>
                <Text style={{ fontSize: 16 }}>{profile?.displayName || auth.currentUser?.displayName || '-'}</Text>
              </View>
              <View>
                <Text style={{ color: '#888', marginBottom: 4 }}>Email</Text>
                <Text style={{ fontSize: 16 }}>{profile?.email || auth.currentUser?.email || '-'}</Text>
              </View>
              <View>
                <Text style={{ color: '#888', marginBottom: 4 }}>Şifrə</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>********</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
              <TouchableOpacity
                onPress={() => setIsChangePasswordOpen((v) => !v)}
                style={{ paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#FDECEE', borderRadius: 10 }}
              >
                <Text style={{ color: '#E53935', fontWeight: '700' }}>{isChangePasswordOpen ? 'Ləğv et' : 'Şifrəni dəyiş'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsProfileModalVisible(false)}
                style={{ paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#F2F2F2', borderRadius: 10 }}
              >
                <Text style={{ color: '#333', fontWeight: '700' }}>Bağla</Text>
              </TouchableOpacity>
            </View>

            {isChangePasswordOpen && (
              <View style={{ marginTop: 14, gap: 10 }}>
                <Text style={{ fontWeight: '700', marginBottom: 4 }}>Şifrəni dəyiş</Text>
                <View style={{ gap: 8 }}>
                  <View>
                    <Text style={{ color: '#888', marginBottom: 4 }}>Cari şifrə</Text>
                    <TextInput
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                      secureTextEntry
                      placeholder="Cari şifrə"
                      placeholderTextColor="#999"
                      style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: '#888', marginBottom: 4 }}>Yeni şifrə</Text>
                    <TextInput
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry
                      placeholder="Yeni şifrə"
                      placeholderTextColor="#999"
                      style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: '#888', marginBottom: 4 }}>Yeni şifrə (təkrar)</Text>
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                      placeholder="Yeni şifrəni təkrar yazın"
                      placeholderTextColor="#999"
                      style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 }}
                    />
                  </View>
                  <TouchableOpacity
                    disabled={changing}
                    onPress={async () => {
                      try {
                        const user = auth.currentUser
                        const email = profile?.email || user?.email
                        if (!user || !email) {
                          Toast.show({ type: 'error', text1: 'Xəta', text2: 'İstifadəçi tapılmadı' })
                          return
                        }
                        if (!currentPassword || !newPassword || !confirmPassword) {
                          Toast.show({ type: 'error', text1: 'Xəta', text2: 'Bütün sahələri doldurun' })
                          return
                        }
                        if (newPassword.length < 6) {
                          Toast.show({ type: 'error', text1: 'Xəta', text2: 'Yeni şifrə ən azı 6 simvol olmalıdır' })
                          return
                        }
                        if (newPassword !== confirmPassword) {
                          Toast.show({ type: 'error', text1: 'Xəta', text2: 'Yeni şifrə təsdiqlə uyğun deyil' })
                          return
                        }
                        setChanging(true)
                        const credential = EmailAuthProvider.credential(email, currentPassword)
                        await reauthenticateWithCredential(user, credential)
                        await updatePassword(user, newPassword)
                        Toast.show({ type: 'success', text1: 'Uğurlu', text2: 'Şifrə dəyişdirildi' })
                        setIsChangePasswordOpen(false)
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                      } catch (e) {
                        Toast.show({ type: 'error', text1: 'Alınmadı', text2: e?.message || 'Yenidən cəhd edin' })
                      } finally {
                        setChanging(false)
                      }
                    }}
                    style={{ marginTop: 4, backgroundColor: '#E53935', borderRadius: 10, paddingVertical: 12, alignItems: 'center' }}
                  >
                    <Text style={{ color: '#fff', fontWeight: '700' }}>{changing ? 'Yüklənir...' : 'Təsdiqlə'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}