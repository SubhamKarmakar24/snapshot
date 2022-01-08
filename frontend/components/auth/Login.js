import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';

export class Login extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin()
    {
        const { email, password } = this.state;
        auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
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
                    onPress={() => this.onLogin()}
                />
            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#000',
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})
