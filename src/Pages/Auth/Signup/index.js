import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../../../firebaseConfig'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import styles from './index.module.js'

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  

  const handleSignup = async () => {
    if (!email || !password) {
      Toast.show({ type: 'error', text1: 'Xəta', text2: 'Email və şifrə tələb olunur' })
      return
    }
    if (!displayName) {
      Toast.show({ type: 'error', text1: 'Xəta', text2: 'Ad tələb olunur' })
      return
    }
    try {
      setLoading(true)
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)

      // Həmişə Dicebear-dan default avatar generasiya edirik (istifadəçi şəkil seçməyəcək)
      const seed = (displayName && displayName.trim()) || email.split('@')[0]
      const encodedSeed = encodeURIComponent(seed)
      const photoURL = `https://api.dicebear.com/7.x/initials/png?seed=${encodedSeed}&radius=50&backgroundType=gradientLinear`

      await updateProfile(cred.user, { displayName: displayName, photoURL: photoURL })

      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: displayName,
        photoURL: photoURL,
        createdAt: serverTimestamp()
      })
      Toast.show({ type: 'success', text1: 'Uğurlu', text2: 'Hesab yaradıldı' })
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Qeydiyyat alınmadı', text2: error?.message || 'Yenidən cəhd edin' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qeydiyyat</Text>
      <Text style={styles.subtitle}>Hesab yarat və şəxsi planını izləməyə başla</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad"
        placeholderTextColor="#999"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifrə"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Gözləyin...' : 'Qeydiyyatdan keç'}</Text>
      </TouchableOpacity>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Hesabın var?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.link}>Daxil ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


