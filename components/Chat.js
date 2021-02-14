import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../config/Fire.js';


function Chat({ navigation }){
  //usestate for the messages on screen
  const [messages, setMessages] = useState([]);

  //flag to change before we exit the chat
  var close = false;

  //creating a user to feed into giftedchat
  const user = {
    name: this.props.navigation.state.params.name,//needs to be adjusted based on stuff from hacksprint session 6
    _id: Fire.shared.uid,
  };

  //start firebase updates
  useEffect(() => {
    Fire.shared.on(message =>
        {setMessages([messages,message]);}
    );
  }, []);

  //end the firebase updates
  useEffect(() => {
    return () => {
      Fire.shared.off();
    }
  }, [close]);



  return (
    <SafeAreaView style = {styles.background}>
      <GiftedChat
        style = {styles.chatbox}
        messages = {messages}
        onSend={Fire.send}
        user={user}
      />
      <Button title="Go back" onPress={() => {close = true; navigation.goBack();}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#BBF1F1',
    flex: 1,
  },
  chatbox: { 
    height: 48,
    margin: 24,
    paddingHorizontal: 24,
    backgroundColor: '#CCABD8',
    borderColor: '#CCABD8',
    borderWidth: 5,
    position: 'absolute',
    bottom: 0,
  },
});

export default Chat;