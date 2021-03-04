import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';


function ChatMessage(props) {
    const { sent, messageText, displayName } = props;
    const messageStyles = [styles.message];
    if (sent) {
        messageStyles.push(styles.sent);
    } else {
        messageStyles.push(styles.received)
    }
    const [inlocation,setinlocation] = useState(true);
    const [location, setLocation] = useState(null);
    const [addy, setAddy] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let messagelocation = await Location.geocodeAsync("New York, NY 10003");

        try{
            let messageaddy = await Location.reverseGeocodeAsync(messagelocation);
            setAddy(messageaddy);
        }
        catch{
            console.log("lol");
        }
        
        if(messagelocation){
            if(messagelocation.longitude!==location.coords.longitude||
                messagelocation.latitude!==location.coords.latitude
                ){
                setinlocation(false);
            }else{
                setinlocation(true);
            }
        }
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    if(inlocation){
        return (
            <View style={{alignSelf: sent ? 'flex-end' : 'flex-start', marginTop: 2, marginBottom: 2}}>
                <View style={styles.messageWrapper}>

                    <View>
                        { !sent && <Text style={styles.nameText}>{displayName}</Text>}
                        <View style={messageStyles}>
                            <Text style={sent ? styles.sent : styles.received}>{messageText}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    else{
        return (
            <View style={{alignSelf: sent ? 'flex-end' : 'flex-start', marginTop: 2, marginBottom: 2}}>
                <View style={styles.messageWrapper}>

                    <View>
                        { !sent && <Text style={styles.nameText}>{displayName}</Text>}
                        <View style={messageStyles}>
                            <Text style={sent ? styles.sent : styles.received}>Message Available at {addy}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    nameText: {
        marginLeft: 8,
        color: 'gray'
    },
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    message: {
        maxWidth: 300,
        padding: 10,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 15,
        alignSelf: 'center',
    },
    photo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 10,
        marginBottom: 5
    },
    sent: {
        backgroundColor: '#ffa611',
        color: 'white'
    },
    received: {
        backgroundColor: '#F3F3F3',
        color: 'black'
    }
});

export default ChatMessage;