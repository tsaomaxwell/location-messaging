
import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from './components/Chat.js';
import HomeScreen from './components/Main.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Hocus Locus"
          component={ChatScreen}
          options={{
            headerTitle: "Welcome to Hocus Locus"
          }}
        />
      </Stack.Navigator>
    </KeyboardAvoidingView>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: '#d1eeff'
  },
});