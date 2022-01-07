import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class Register extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp()
    {
        const { email, password, name } = this.state;
        auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            firestore().collection("users")
            .doc(auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render()
    {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    title="Register"
                    onPress={() => this.onSignUp()}
                />
            </View>
        )
    }
}

export default Register;

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#000',
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})
