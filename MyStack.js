import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Main from './components/Main';
import Chat from './components/Chat';
// Create the navigator
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator styles = {styles.navs}>
      <Stack.Screen
        styles = {styles.navs}
        name='Main'
        component={Main}
      />
      <Stack.Screen 
        name='Chat' 
        styles = {styles.navs}
        component={Chat} 
      />
    </Stack.Navigator>
  );
}

export default MyStack;

const styles = StyleSheet.create({
  navs: {
      backgroundColor: '#d1eeff'
  },
});