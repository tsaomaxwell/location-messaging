import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView,
    Keyboard,
    FlatList,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import ChatMessage from '../components/ChatMessage';
// Import Firebase
import firebase from 'firebase';
// Import database
import { db } from '../config/Fire.js';

function ChatScreen({ route }) {
    const [currentUser, setCurrentUser] = useState('0');
    useEffect(() => {
        setCurrentUser(route.params.uid);
    }, []);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState(false);
    var bot = (route.params.bot === 'Nun');

    const addNewMessage = async (uid, messageText) => {
        try { 
            // Add new document with auto-generated ID (returns a document reference)
            const docRef = await db.collection('chatroom').add({
                uid,
                messageText,
                displayName: route.params.displayName || 'Anonymous',
                photoURL: null,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Document written with ID: " + docRef.id);
        } catch (error) {
            console.log(error)
        }
    }

    const listenForUpdates = () => {
        // Listen for database changes in real time
        const query = db.collection('chatroom').limit(20).orderBy('timestamp', 'desc');

        // query.onSnapshot creates a listerner that runs a function whenever changes occur in database
        const unsubscribe = query.onSnapshot((querySnapshot) => {
            let messageArr = [];
            querySnapshot.forEach((doc) => {
                const { uid, messageText, displayName, photoURL } = doc.data();
                messageArr.push({
                    messageId: doc.id,
                    uid,
                    messageText,
                    displayName,
                    photoURL
                });
                setMessages(messageArr);
            });

        });

        return unsubscribe;
    }

    useEffect(() => {
        return listenForUpdates();
    }, [])
    
    const handleChange = (update) => {
        setMessage(update);
    }

    const handleSend = () => {
        addNewMessage(currentUser, message);
        setMessage('');
    }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
    
    const [show, setShow] = useState(false);
    const activateImage = () => {
        if(bot === true&&image===false){
            setImage(true);
            Alert.alert(
                "Get yeee away",
                "God is watching" ,
                [
                    { text: "OK", onPress: () => {
                            setShow(true);
                            sleep(500);
                            setShow(false);
                        }
                    }
                ],
                { cancelable: false }
            );
            bot = false;
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.chatArea} >
                        {show ? (<Image 
                            source={require('../assets/angrynun.jpg')}
                            style={styles.image}
                        />) : (<></>)}
                        <FlatList 
                            data={messages}
                            renderItem={({ item }) => {
                                return <ChatMessage 
                                    sent={item.uid === currentUser}
                                    displayName={item.displayName}
                                    messageText={item.messageText}
                                    photoURL={item.photoURL}
                                    homeAddy={route.params.homeAddy}
                                    callback={activateImage}
                                />
                            }}
                            inverted={true}
                            keyExtractor={item => item.messageId.toString()}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.inputArea}>
                    <View style={styles.inner}>
                        <TextInput 
                            placeholder="Aa" 
                            style={styles.messageInput} 
                            value={message}
                            onChangeText={handleChange}
                            multiline={true}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.sendBtn}
                            disabled={message === ''}
                        >
                            <FontAwesome name="send" size={24} color={message ? "white" : '#96bdd4'} />
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#03a1fc'
    },
    chatArea: {
        flex: 10,
        margin: 10
    },
    inputArea: {
        minHeight: 40
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    messageInput: {
        flex: 8,
        borderRadius: 20,
        backgroundColor: '#D7FBFD',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 10,
        marginLeft: 10
    },
    sendBtn: {
        padding: 5
    },
    image: {
        width: 300,
        height: 300
    }, 
});

export default ChatScreen;