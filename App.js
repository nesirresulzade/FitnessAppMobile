import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Index from "./src/Pages/EnterPage";
import Home from "./src/Pages/HomePage/home";
import DetailsPage from "./src/Pages/DetailsPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="IndexPage" 
            component={Index} 
            options={{ 
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="HomePage" 
            component={Home} 
            options={{ 
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="DetailsPage" 
            component={DetailsPage} 
            options={{ 
              headerShown: false 
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
