import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Main from './components/Main';
import Chat from './components/Chat';
// Create the navigator
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Main'
        component={Main}
      />
      <Stack.Screen 
        name='Chat' 
        component={Chat} 
      />
    </Stack.Navigator>
  );
}

export default MyStack;