import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>
{
    return null;
}

export class Main extends Component
{
    componentDidMount()
    {
        this.props.fetchUser();
    }

    render()
    {
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={26} />),
                    }} />
                <Tab.Screen name="_Add" component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add");
                    }
                })}
                    options={{
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="plus-box" color={color} size={26} />),
                    }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-circle" color={color} size={26} />),
                    }} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) =>
(
{
    currentUser: store.userState.currentUser
}
);
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);

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
