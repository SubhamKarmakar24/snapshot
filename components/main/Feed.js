import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Button, Platform } from 'react-native';

import Firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux';

function Feed(props)
{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        let posts = [];

        if(props.usersLoaded === props.following.length)
        {
            for(let i=0;i<props.following.length;i++)
            {
                const user = props.users.find(el => el.uid === props.following[i]);

                if(user != undefined)
                {
                    posts = [...posts, ...user.posts];
                }
            }

            posts.sort(function(x, y)
            {
                return(y.creation - x.creation);
            });

            setPosts(posts);
        }

    }, [props.usersLoaded]);

    return (
        <View style={styles.container}>
            <View style={styles.galleryContainer}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.imageContainer}>
                            <Text>{ item.user.name }</Text>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded
});

export default connect(mapStateToProps, null)(Feed);

const styles = StyleSheet.create({

    container:
    {
        flex: 1,
    },
    infoContainer:
    {
        margin: 20,

    },
    galleryContainer:
    {
        flex: 1,
    },
    image:
    {
        ...Platform.select({
            ios:
            {
                flex: 1,
                aspectRatio: 1,           
            },
            android:
            {
                flex: 1,
                aspectRatio: 1,
            },
            default:
            {
                // width: '100%',
                height: 500,
                aspectRatio: 1,
            },
        }),
    },
    imageContainer:
    {
        flex: 1/3,
    }

});
