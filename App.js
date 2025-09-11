import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Index from "./src/Pages/EnterPage";
import Home from "./src/Pages/HomePage/home";
import DetailsPage from "./src/Pages/DetailsPage";
import Login from "./src/Pages/Auth/Login";
import Signup from "./src/Pages/Auth/Signup";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null)
      if (initializing) setInitializing(false)
    })
    return unsub
  }, [initializing])

  if (initializing) {
    return null
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="HomePage" component={Home} />
              <Stack.Screen name="DetailsPage" component={DetailsPage} />
            </>
          ) : (
            <>
              <Stack.Screen name="IndexPage" component={Index} />
              <Stack.Screen name="LoginPage" component={Login} />
              <Stack.Screen name="SignupPage" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="top" topOffset={50} />
    </SafeAreaProvider>
  );
}
