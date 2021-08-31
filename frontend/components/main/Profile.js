import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Button, Platform } from 'react-native';

import Firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux';

function Profile(props)
{
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        const { currentUser, posts } = props;

        if(props.route.params.uid === Firebase.auth().currentUser.uid)
        {
            setUser(currentUser);
            setUserPosts(posts);
        }
        else
        {
            Firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) =>
            {
                if(snapshot.exists)
                {
                    setUser(snapshot.data());
                }
                else
                {
                    console.log("Snapshot doesn't exist");
                }
            })

            Firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation", "desc")
            .get()
            .then((snapshot) =>
            {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data};
                });
                setUserPosts(posts);
            })
        }

        if(props.following.indexOf(props.route.params.uid) > -1)
        {
            setFollowing(true);
        }
        else
        {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following]);


    const onFollow = () =>
    {
        Firebase.firestore()
        .collection("following")
        .doc(Firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .set({})
    }

    const onUnfollow = () =>
    {
        Firebase.firestore()
        .collection("following")
        .doc(Firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete({})
    }

    const onLogout = () =>
    {
        Firebase.auth().signOut();
    }


    if(user === null)
    {
        return (
            <ActivityIndicator size="large" />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text>{ user.name }</Text>
                <Text>{ user.email }</Text>
                {
                    props.route.params.uid !== Firebase.auth().currentUser.uid ? 
                        <View>
                            {
                                following ?
                                    <Button
                                        title="Following"
                                        onPress={() => onUnfollow()}
                                    />
                                :
                                    <Button
                                        title="Follow"
                                        onPress={() => onFollow()}
                                    />
                            }
                        </View>
                    :
                        <Button
                            title="Logout"
                            onPress={() => onLogout()}
                        />
                }
            </View>
            <View style={styles.galleryContainer}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({item}) => (
                        <View style={styles.imageContainer}>
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
    posts: store.userState.posts,
    following: store.userState.following
});

export default connect(mapStateToProps, null)(Profile);

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
