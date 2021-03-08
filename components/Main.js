import React, { useState } from 'react';
import { 
    SafeAreaView,
    Keyboard,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import UUID from '../utils/uuid';

function HomeScreen({ navigation }) {
    const [displayName, setDisplayName] = useState('');
    const [homeAddy, setHomeAddy] = useState('');
    const handlePress = () => {
        navigation.navigate('Hocus Locus', {
            displayName,
            homeAddy,
            uid: UUID()
        });
    }

    const handleChange = (update) => {
        if (update.length <= 20)
            setDisplayName(update);
    }

    const handleAddy = (update) =>{
        setHomeAddy(update);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Hocus Locus</Text>
                <Image 
                    source={require('../assets/logEugene.png')}
                    style={styles.image}
                />
                <TextInput
                    style={styles.nameInput}
                    placeholder='Set Display Name'
                    value={displayName}
                    onChangeText={handleChange}
                />
                <TextInput
                    style={styles.homeInput}
                    placeholder='Set Home Address'
                    value={homeAddy}
                    onChangeText={handleAddy}
                />
                <TouchableOpacity 
                    onPress={handlePress}
                    style={styles.btn}
                    disabled={displayName === ''}
                >
                    <Text style={{color: displayName === '' ? 'gray' : '#ffa611'}}>Start Chatting</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21ADA8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'
    },
    image: {
        width: 300,
        height: 300
    }, 
    btn: {
        marginTop: 60,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    nameInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        minWidth: 100,
        maxWidth: 200,
        textAlign: 'center'
    },
    homeInput: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        minWidth: 200,
        maxWidth: 600,
        textAlign: 'center'
    }
});

export default HomeScreen;
