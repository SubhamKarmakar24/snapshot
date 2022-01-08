import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Profile(props)
{
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        const { currentUser, posts } = props;

        if(props.route.params.uid === auth().currentUser.uid)
        {
            console.log("fetching logged in user...");
            setUser(currentUser);
            setUserPosts(posts);
        }
        else
        {
            firestore().collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists)
                {
                    setUser(snapshot.data());
                }
                else
                {
                    console.log("User doesn't exist");
                }
            })

            firestore().collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                console.log("fetching...");
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
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
        firestore()
        .collection("following")
        .doc(auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .set({})
    }

    const onUnfollow = () =>
    {
        firestore()
        .collection("following")
        .doc(auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete()
    }

    const onLogout = () =>
    {
        auth().signOut();
    }

    if(user === null)
    {
        return (
            <ActivityIndicator size="large" />
        )
    }

    return (
        <View style={styles.container}>
            <View>    
                <Text>{user.name}</Text>
                {
                    props.route.params.uid !== auth().currentUser.uid ?
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
            <View style={styles.gallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.touchable}>
                            {/* <View> */}
                            <Image
                                source={{ uri: item.downloadURL }}
                                style={styles.img}  
                            />
                            {/* </View> */}
                        </TouchableOpacity>
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