import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../../firebaseConfig'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import styles from './index.module.js'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({ type: 'error', text1: 'Xəta', text2: 'Email və şifrə tələb olunur' })
      return
    }
    try {
      setLoading(true)
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password)

      const userRef = doc(db, 'users', cred.user.uid)
      const snap = await getDoc(userRef)
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || '',
          photoURL: cred.user.photoURL || null,
          createdAt: serverTimestamp()
        })
      }
      Toast.show({ type: 'success', text1: 'Uğurlu', text2: 'Xoş gəldiniz!' })
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Giriş alınmadı', text2: 'Yenidən cəhd edin' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş</Text>
      <Text style={styles.subtitle}>Hesabına daxil ol və məşqlərə başla</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Gözləyin...' : 'Daxil ol'}</Text>
      </TouchableOpacity>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Hesabın yoxdur?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
          <Text style={styles.link}>Qeydiyyat</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


