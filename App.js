import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));

// Hide this portion in ENV variable
const firebaseConfig =
{
    apiKey: "AIzaSyCPp8u8-aGWIQTopNOXXiEu3vmxLi7hAcQ",
    authDomain: "snapshot-4362f.firebaseapp.com",
    projectId: "snapshot-4362f",
    storageBucket: "snapshot-4362f.appspot.com",
    messagingSenderId: "291469004295",
    appId: "1:291469004295:web:13e8f7fe20600f014764a2",
    measurementId: "G-3Y7KSH231Q"
};

if(firebase.apps.length === 0)
{
    firebase.initializeApp(firebaseConfig);
}


import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';

const Stack = createStackNavigator();

export class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            loggedIn: false,
            loaded: false,
        }
    }

    componentDidMount()
    {
        firebase.auth().onAuthStateChanged((user) =>
        {
            if(!user)
            {
                this.setState({
                    loggedIn: false,
                    loaded: true,
                });
            }
            else
            {
                this.setState({
                    loggedIn: true,
                    loaded: true,
                });
            }
        });
    }

    render()
    {
        const { loggedIn, loaded } = this.state;

        if(!loaded)
        {
            return(
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>
            )
        }

        if(!loggedIn)
        {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}} />
                        <Stack.Screen name="Register" component={RegisterScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }

        return(
            <Provider store={store}>
                <MainScreen />
            </Provider>
        )
    }
}

export default App;

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
