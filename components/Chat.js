import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


function Chat({ navigation }){
  const [messages, setMessages] = useState([]);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GiftedChat
        messages={messages}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default Chat;