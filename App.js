import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';

const Stack = createNativeStackNavigator();

export class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loaded: false,
        }
    }

    componentDidMount()
    {
        auth().onAuthStateChanged((user) => {
            if(!user)
            {
                this.setState({
                    loggedIn: false,
                    loaded: true
                })
            }
            else
            {
                this.setState({
                    loggedIn: true,
                    loaded: true
                })
            }
        })
    }

    render()
    {
        const { loggedIn, loaded } = this.state;

        if(!loaded)
        {
            return(
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        if(!loggedIn)
        {   
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }

        return(
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}

export default App;

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
