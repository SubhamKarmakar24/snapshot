import React from 'react';
import { Text, View, Button, StyleSheet, Platform } from 'react-native';

export default function Landing({ navigation })
{
    return (
        <View style={styles.container}>
            <Button 
                title="Register"
                onPress={() => navigation.navigate("Register")} />
            <Button 
                title="Login"
                onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

const styles = StyleSheet.create({

    container:
    {
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        ...Platform.select({
            ios:
            {
                backgroundColor: '#efe',
            },
            android:
            {
                backgroundColor: '#efe',
            },
            default:
            {
                backgroundColor: '#efe',
            },
        }),
    },


});
