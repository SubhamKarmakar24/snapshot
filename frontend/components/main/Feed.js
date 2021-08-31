import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Button, Platform } from 'react-native';

import Firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux';

function Feed(props)
{
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        if(props.usersFollowingLoaded === props.following.length && props.following.length !== 0)
        {
            props.feed.sort(function(x, y)
            {
                return(y.creation - x.creation);
            });

            setPosts(props.feed);
        }
    }, [props.usersFollowingLoaded, props.feed]);

    const onLikePress = (uid, postId) =>
    {
        Firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(Firebase.auth().currentUser.uid)
        .set({})
    }

    const onDislikePress = (uid, postId) =>
    {
        Firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(Firebase.auth().currentUser.uid)
        .delete()
    }


    return (
        <View style={styles.container}>
            <View style={styles.galleryContainer}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                            {
                                item.currentUserLike ?
                                    <Button
                                        title="Dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)}
                                    />
                                :
                                    <Button
                                        title="Like"
                                        onPress={() => onLikePress(item.user.uid, item.id)}
                                    />
                            }
                            <Text>{ item.user.name }&nbsp;&nbsp;{ item.caption }</Text>
                            <Text
                                onPress={() => props.navigation.navigate("Comments", { postId: item.id, uid: item.user.uid })}
                            >
                                View Comments...
                            </Text>
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
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded
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
