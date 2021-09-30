import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

import firebase from 'firebase';

export class Login extends Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            email: '',
            password: '',
        }

        this.onSignIn = this.onSignIn.bind(this);
        this.onGoogleSignIn = this.onGoogleSignIn.bind(this);
    }

    onSignIn()
    {
        const { email, password, name } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => 
        {
            console.log(result);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    onGoogleSignIn()
    {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) =>
        {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            firebase.firestore().collection("users")
            .doc(user.uid)
            .set({
                name: user.displayName,
                email: user.email
            });
            console.log(result);
        })
        .catch((error) =>
        {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            if(errorMessage == 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.')
            {
                console.log("Eject from EXPO");
            }
            
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(errorMessage);
        });
    }

    render()
    {
        return (
            <View>
                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({ email })} />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })} />
                <Button
                    onPress={() => this.onSignIn()}
                    title="Sign In" />

                <View style={styles.pad1}/>

                <Button
                    onPress={() => this.onGoogleSignIn()}
                    title="Google" />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    pad1:
    {
        marginTop: 40,
    },

});


export default Login;
