import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance } from 'geolib';


function ChatMessage(props) {
    const { sent, messageText, displayName, homeAddy, callback } = props;
    const messageStyles = [styles.message];
    if (sent) {
        messageStyles.push(styles.sent);
    } else {
        messageStyles.push(styles.received)
    }
    const [addy, setAddy] = useState("");
    const [message, setMessage] = useState("Loading...");
    const angrynun = "655 Gayley Ave, Los Angeles, CA 90024";

    useEffect(()=>{
        var text = String(messageText);
        if(text.includes("@@")){
            var address = messageText.substr(messageText.indexOf("@@")+2);
            if(address ==="home"){
                address = homeAddy;
            }
            setAddy(address);
        }else{
            setMessage(messageText);
        }
    },[])
  
    useEffect(() => {
      (async () => {
        if(addy!==""){
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            let messagelocation = "";
            let nunlocation = "";
            try{
                messagelocation = await Location.geocodeAsync(addy);
                if(messagelocation&&location&&messagelocation.length>0){
                    const coord1 = {latitude: messagelocation[0].latitude,
                                    longitude: messagelocation[0].longitude};
                    const coord2 = {latitude: location.coords.latitude,
                                longitude: location.coords.longitude};              
                    var distanceInMeters = getDistance(coord1,coord2);
                    if(distanceInMeters>1600){
                        if(addy===homeAddy){
                            setMessage("Message at " + "home");
                        }
                        else{
                            setMessage("Message at " + addy);
                        }
                    }else{
                        setMessage(messageText);
                    }
                } else {
                    setAddy("INVALID LOCUS");
                }
                nunlocation = await Location.geocodeAsync(angrynun);
                if(nunlocation&&location&&nunlocation.length>0){
                    const coord3 = {latitude: nunlocation[0].latitude,
                                    longitude: nunlocation[0].longitude};
                    const coord4 = {latitude: location.coords.latitude,
                                longitude: location.coords.longitude};              
                    var distanceInMeters = getDistance(coord3,coord4);
                    if(distanceInMeters<1600){
                        callback();
                    }
                }
            }
            catch(err){
                setMessage("Invalid Location");
                console.log(err);
            }
        }   
      })();
    }, [addy]);

    return (
        <View style={{alignSelf: sent ? 'flex-end' : 'flex-start', marginTop: 2, marginBottom: 2}}>
            <View style={styles.messageWrapper}>
                <View>
                    { !sent && <Text style={styles.nameText}>{displayName}</Text>}
                    <View style={messageStyles}>
                        <Text style={sent ? styles.sent : styles.received}>{message}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nameText: {
        marginLeft: 8,
        color: 'white'
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
        backgroundColor: '#21ADA8',
        color: 'white'
    },
    received: {
        backgroundColor: '#D7FBFD',
        color: 'black'
    }
});

export default ChatMessage;