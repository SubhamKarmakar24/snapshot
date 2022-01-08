import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, Dimensions } from 'react-native';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function Save(props)
{
    const [caption, setCaption] = useState('');

    const uploadImage = async () =>
    {
        const uri = props.route.params.image;
        const path = `post/${auth().currentUser.uid}/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = storage().ref().child(path).put(blob);

        const taskProgress = snapshot =>
        {
            console.log(`Transferred: ${snapshot.bytesTransferred}`);
        }

        const taskCompleted = () =>
        {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot);
            })
        }

        const taskError = snapshot =>
        {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) =>
    {
        firestore().collection("posts")
        .doc(auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            likesCount: 0,
            creation: firestore.FieldValue.serverTimestamp()
        })
        .then((function ()
        {
            props.navigation.popToTop();
        }))
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: props.route.params.image}} style={styles.img} />
            <TextInput
                placeholder="Enter caption"
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
    },
    img:
    {
        width: Dimensions.get('window').width,
        aspectRatio: 1,
    }
})
