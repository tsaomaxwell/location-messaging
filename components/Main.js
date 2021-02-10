import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity, SafeAreaView} from 'react-native';

function Main({ navigation }) {
  const [name, setName] = useState('');
  return(
    <SafeAreaView style = {styles.background}>
        <Text style = {styles.title}>Hello, what's your name?</Text>
        <TextInput
          style={styles.nameInput}
          placeholder='type a message'
          onChangeText={(input) => setName(input)}
          value={name}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.buttonText}>
            Go to Chat
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const offset = 24;
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#20B2AA',
    flex: 1,
  },
  title: { 
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: { 
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
    color: "#FFF"
  },
});

export default Main;