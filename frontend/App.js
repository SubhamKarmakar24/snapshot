import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { navigationRef } from './components/navigation/RootNavigation';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import CommentsScreen from './components/main/Comments';

import Firebase from 'firebase';
import { firebaseConfig } from './Firebase-Config';

if(Firebase.apps.length === 0)
{
    Firebase.initializeApp(firebaseConfig);
}


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

//Remove afterwards
console.disableYellowBox = true;

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
        Firebase.auth().onAuthStateChanged((user) =>
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

        function getHeaderTitle(route)
        {
            // If the focused route is not found, we need to assume it's the initial screen
            // This can happen during if there hasn't been any navigation inside the screen
            // In our case, it's "Feed" as that's the first screen inside the navigator
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
          
            switch(routeName)
            {
                case 'Feed':
                    return 'Feed';
                case 'Profile':
                    return 'Profile';
                case 'Search':
                    return 'Search';
            }
        }

        if(!loaded)
        {
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }

        if(!loggedIn)
        {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }

        return(
            <Provider store={store}>
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="Main" component={MainScreen}
                            options={({ route }) => ({
                                headerTitle: getHeaderTitle(route),
                                headerShown: Platform.OS === 'android'? true: (Platform.OS === 'ios'? true: false),
                            })} />
                        <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
                        <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
                        <Stack.Screen name="Comments" component={CommentsScreen} navigation={this.props.navigation} />
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
