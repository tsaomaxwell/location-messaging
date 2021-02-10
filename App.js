import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './MyStack.js'
// Import React Navigation
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
