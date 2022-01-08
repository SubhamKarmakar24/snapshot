import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Feed(props)
{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(props.usersFollowingLoaded === props.following.length && props.following.length !== 0)
        {
            
            props.feed.sort(function(x, y)
            {
                return(x.creation - y.creation);
            });

            setPosts(props.feed);
        }

    }, [props.usersFollowingLoaded, props.feed]);

    const onLikePress = (userId, postId) =>
    {
        firestore()
        .collection("posts")
        .doc(userId)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(auth().currentUser.uid)
        .set({});
    }

    const onDislikePress = (userId, postId) =>
    {
        firestore()
        .collection("posts")
        .doc(userId)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(auth().currentUser.uid)
        .delete();
    }

    return (
        <View style={styles.container}>
            <View style={styles.gallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.touchable}>
                            <Text>{item.user.name}</Text>
                            <Image
                                source={{ uri: item.downloadURL }}
                                style={styles.img}  
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
                            <Text onPress={() => props.navigation.navigate("Comments", { postId: item.id, uid: item.user.uid })}>View Comments...</Text>
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
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

export default connect(mapStateToProps, null)(Feed);

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#000',
    },
    gallery:
    {
        flex: 1,
    },
    img:
    {
        flex: 1,
        aspectRatio: 1
    },
    touchable:
    {
        flex: 1/3,
    }
})